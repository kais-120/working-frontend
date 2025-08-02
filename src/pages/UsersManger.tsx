import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AxiosToken } from "../API/Api"
import { Plus, Trash } from "lucide-react"
import AddNewsOwner from "@/components/AddNewsOwner"
import { Input } from "@/components/ui/input"
import Swal from "sweetalert2"
import { useUser } from "@/hooks/useUser"

const UsersManager = () => {
  const [users, setUsers] = useState({ users: { rows: [], count: 0 }, totalPage: 1 })
  const [usersFilter, setUsersFilter] = useState({ users: { rows: [], count: 0 } })
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [change, setChange] = useState(0)
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    if(search.trim().length < 1) {
      AxiosToken.get(`/user/all/${page}`).then((res) => {
        setUsers(res.data)
        setUsersFilter(res.data)
      }).finally(()=>setLoading(false))
    }
  }, [page, change,search])

  useEffect(() => {
    if(search.trim().length < 1) return;
    const delaySearch = setTimeout(() => {
      if (search.trim().length > 0) {
        AxiosToken.get(`/user/search/${page}?name=${search}`)
          .then((response) => {
            const data = response.data
            setUsersFilter({ users: data.users || data })
          })
          .catch((err) => {
            console.error("Search error:", err)
            setUsersFilter({ users: { rows: [], count: 0 } })
          })
      } else {
        setUsersFilter(users)
      }
    }, 300)
    
    return () => clearTimeout(delaySearch)
  }, [search,page,change])
  const currentUser = useUser()
  const totalPages = usersFilter?.totalPage || 1

  const getPages = () => {
    const pages = []
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push("...")
      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (page < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }
  const handleDelete = (id,name) => {
    Swal.fire({
        title: "Es-tu sûr?",
        text: `Vous souhaitez supprime le utitateur r ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try{
            AxiosToken.delete(`/user/delete/${id}`);
            setChange(prev => prev + 1)
          }
          catch{
            console.error("error")
          }
        }
      })
  }
 if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div>
      <AddNewsOwner open={showAddDialog} onOpenChange={setShowAddDialog} onChange={setChange} />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Gestion des utilisateurs</h2>
          <p className="text-sm text-gray-600">Gérer les comptes utilisateurs</p>
        </div>
        <Button
          className="bg-coworking-primary hover:bg-coworking-primary/90"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Propriétaire
        </Button>
      </div>

      <div className="mb-4">
        <Input
        className="w-full"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un utilisateur"
        />
      </div>

      <Table className="bg-white shadow-sm rounded-md min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersFilter?.users?.rows?.length > 0 ? (
            usersFilter.users.rows.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.rule === "owner" ? "Proriétaire" : user.rule}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell><button  onClick={()=>handleDelete(user.id,user.name)}  disabled={currentUser?.user?.email === user?.email }><Trash  className={`w-5 h-5 ${
        currentUser?.user?.email === user?.email ? 'text-red-400' : 'text-red-500 hover:text-red-700'}`}  /></button></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total: {usersFilter?.users?.count}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
          {usersFilter.users.count > 0 &&
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage((prev) => prev - 1)}
              className={page === 1 ? "pointer-events-none cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>

          {getPages().map((p, i) =>
            p === "..." ? (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => setPage(p)}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && setPage((prev) => prev + 1)}
              className={page === totalPages ? "pointer-events-none cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      }
    </div>
  )
}

export default UsersManager
