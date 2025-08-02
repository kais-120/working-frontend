import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { AxiosToken } from "../../API/Api"
interface Review {
  id:number,
  review:string,
  rating:number,
  position:string,
  userReviews:{
    name:string
  }
}

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reviews,setReviews] = useState<Review[]>([]);

  useEffect(()=>{
    AxiosToken.get("/review/public/get")
    .then((response)=>setReviews(response.data))
    .catch(()=>console.error("error"))
  },[])
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews?.length) % reviews?.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    if(reviews.length === 1) return;
  const interval = setInterval(() => {
    if (reviews.length > 0) nextTestimonial();
  }, 7000);
  return () => clearInterval(interval);
}, [reviews]);
if (!reviews.length) return null;


  const currentTestimonial = reviews[currentIndex];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${
          index < rating 
            ? 'text-orange-400 fill-orange-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-full max-w-6xl p-6 mx-auto bg-gradient-to-br transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px]">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center rounded-md">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ce Que Nos Membres En Pensent
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>

        <div className="relative px-8 py-16 md:px-16">
          <div className="absolute top-8 left-8 opacity-10">
            <Quote className="w-24 h-24 text-blue-600" />
          </div>
    {
      reviews.length > 1 &&
      <>
      <button
      onClick={prevTestimonial}
      disabled={isAnimating}
      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
          onClick={nextTestimonial}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          </>
          }

          <div className={`text-center transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic">
                "{currentTestimonial?.review}"
              </p>
            </div>

            <div className="flex justify-center mb-8 space-x-1">
              {renderStars(currentTestimonial?.rating)}
            </div>

            <div className="flex flex-col items-center space-y-4">
          

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {currentTestimonial?.userReviews?.name}
                </h3>
                <p className="text-lg text-gray-500 italic">
                  {currentTestimonial?.position}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-8 space-x-3">
          {reviews && reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 right-10 bg-black/10 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} / {reviews?.length}
          </span>
        </div>

    
      </div>
    </div>
  );
};

export default ReviewSection;