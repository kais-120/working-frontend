
const TopBar = ({user}) => {
  return (
     <div className="mb-8 animate-slide-in-from-top">
          <div className="grid md:flex items-center justify-between px-4">
            <div>
              <h1 className="text-4xl capitalize font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard {user === "owner" ? "Proriétaire" : user === "admin" ? "Administrateur" : user  }
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Gérez votre plateforme de coworking</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">En ligne</span>
              <a href="/" className="text-sm text-gray-500 cursor-pointer">Accueil</a>

            </div>
          </div>
        </div>
  )
}

export default TopBar