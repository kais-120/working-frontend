
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Star, MessageSquare, Send, ThumbsUp, Eye } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import axios from "axios";
import { API_URL } from "../API/Api";


const FeedbackSection = () => {
  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Charger les feedbacks au montage du composant
  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Define feedbackService with a getAll method
  const feedbackService = {
    getAll: (status: string) =>
      axios.get(`${API_URL}/auth/feedback/all`, {
        params: { status },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
        },
      }),
  };

  const loadFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await feedbackService.getAll('approved');
      setFeedbacks(response.data || []);
    } 
    finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
    await axios.post(`${API_URL}/auth/feedback/add`,{
      message:newFeedback,
      rating:rating,
    },
    {
      headers :{
      Authorization: `Bearer ${window.localStorage.getItem("auth")}`
      }
    })
    setNewFeedback("");
    setRating(null)
    toast({
      title: "feedback envoyé",
      description: "Merci pour votre feedback",
    });
  }catch(err){
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur Djerba coworking !",
    });
  }

  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Vos Retours Comptent
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partagez votre expérience et consultez les avis de la communauté
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Submit Feedback Form */}
          <Card className="hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Laisser un Feedback
              </CardTitle>
              <CardDescription>
                Aidez-nous à améliorer nos services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Votre note</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-all duration-200 hover:scale-110"
                        onClick={() => handleStarClick(star)}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Votre commentaire</label>
                  <Textarea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Partagez votre expérience..."
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 bg-white"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Envoyer le Feedback
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
