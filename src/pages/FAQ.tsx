import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FAQItem {
  question: { fr: string; en: string; ar: string };
  answer: { fr: string; en: string; ar: string };
  category: string;
}

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [language, setLanguage] = useState<'fr' | 'en' | 'ar'>('fr');

  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>();
  const [searchRef, searchVisible] = useIntersectionObserver<HTMLElement>();
  const [faqRef, faqVisible] = useIntersectionObserver<HTMLElement>();
  const [contactRef, contactVisible] = useIntersectionObserver<HTMLElement>();

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const faqItems: FAQItem[] = [
    // Général
    {
      question: {
        fr: "Qu'est-ce qu'un espace de coworking ?",
        en: "What is a coworking space?",
        ar: "ما هو مساحة العمل المشترك؟"
      },
      answer: {
        fr: "Un espace de coworking est un environnement de travail partagé où des professionnels indépendants, des entrepreneurs et des employés à distance peuvent travailler dans un cadre professionnel, collaboratif et stimulant.",
        en: "A coworking space is a shared work environment where independent professionals, entrepreneurs, and remote employees can work in a professional, collaborative, and stimulating setting.",
        ar: "مساحة العمل المشترك هي بيئة عمل مشتركة حيث يمكن للمهنيين المستقلين ورواد الأعمال والموظفين عن بُعد العمل في إطار مهني وتعاوني ومحفز."
      },
      category: "general"
    },
    {
      question: {
        fr: "Quels sont vos horaires d'ouverture ?",
        en: "What are your opening hours?",
        ar: "ما هي ساعات العمل لديكم؟"
      },
      answer: {
        fr: "Notre espace est ouvert du lundi au vendredi de 8h00 à 20h00, et le samedi de 9h00 à 18h00. Les membres Premium bénéficient d'un accès 24/7.",
        en: "Our space is open Monday to Friday from 8:00 AM to 8:00 PM, and Saturday from 9:00 AM to 6:00 PM. Premium members have 24/7 access.",
        ar: "مساحتنا مفتوحة من الاثنين إلى الجمعة من 8:00 صباحًا حتى 8:00 مساءً، والسبت من 9:00 صباحًا حتى 6:00 مساءً. يتمتع الأعضاء المميزون بإمكانية الوصول على مدار الساعة طوال أيام الأسبوع."
      },
      category: "general"
    },
    // Adhésion
    {
      question: {
        fr: "Quels types d'abonnements proposez-vous ?",
        en: "What types of subscriptions do you offer?",
        ar: "ما هي أنواع الاشتراكات التي تقدمها؟"
      },
      answer: {
        fr: "Nous proposons plusieurs formules adaptées à différents besoins : Flexible (à la journée), Privatif (accès limité), Pro (accès complet) et Premium (bureau dédié). Chaque formule offre différents avantages et services.",
        en: "We offer several subscription packages tailored to different needs: Flexible (daily), Privatif (limited access), Pro (full access), and Premium (dedicated office). Each package offers various benefits and services.",
        ar: "نحن نقدم عدة أنواع من الاشتراكات ملائمة لاحتياجات مختلفة: Flexible (يوميًا), Privatif (الوصول المحدود), Pro (الوصول الكامل) وPremium (المساحة المخصصة). كل من هذه الأنواع تقدم العديد من الفوائد والخدمات."
      },
      category: "membership"
    },
    {
      question: {
        fr: "Y a-t-il un engagement minimum pour les abonnements ?",
        en: "Is there a minimum commitment for subscriptions?",
        ar: "هل هناك engagement mحدد للاشتراكات؟"
      },
      answer: {
        fr: "Non, tous nos forfaits sont sans engagement à long terme. Vous pouvez annuler à tout moment avec un préavis de 30 jours pour les forfaits mensuels.",
        en: "No, all our subscriptions are without a long-term commitment. You can cancel at any time with a 30-day notice for monthly subscriptions.",
        ar: "لا، جميع الاشتراكات لدينا دون engagement طويل الأمد. يمكنك إلغاء الاشتراك في أي وقت بوقت 30 يومًا للاشتراكات الشهرية."
      },
      category: "membership"
    },
    {
      question: {
        fr: "Puis-je changer de formule en cours d'abonnement ?",
        en: "Can I change my subscription package during my subscription?",
        ar: "هل يمكنني تغيير نوع الاشتراك في وقت الاشتراك؟"
      },
      answer: {
        fr: "Oui, vous pouvez passer à une formule supérieure à tout moment. Pour passer à une formule inférieure, il suffit de nous en informer avant votre prochain cycle de facturation.",
        en: "Yes, you can change your subscription package at any time. To downgrade, simply inform us before your next billing cycle.",
        ar: "نعم، يمكنك تغيير نوع الاشتراك في أي وقت. لخفض الاشتراك، يرجى مراجعة مواعيد الفواتير الخاصة بك."
      },
      category: "membership"
    },
    {
      question: {
        fr: "Acceptez-vous les paiements mensuels ?",
        en: "Do you accept monthly payments?",
        ar: "هل تقبل الاشتراكات الشهرية؟"
      },
      answer: {
        fr: "Oui, tous nos abonnements mensuels sont facturés de façon mensuelle, avec possibilité de paiement automatique par prélèvement bancaire ou carte de crédit.",
        en: "Yes, all our monthly subscriptions are billed monthly, with the option of automatic payment via bank transfer or credit card.",
        ar: "نعم، جميع الاشتراكات الشهرية لدينا مفتوحة للدفع الشهرية، مع القدرة على الدفع عبر تحويل بنكي أو بطاقات الائتمان."
      },
      category: "membership"
    },
    // Services
    {
      question: {
        fr: "Y a-t-il des boissons et snacks disponibles sur place ?",
        en: "Are there drinks and snacks available on site?",
        ar: "هل تقدم مساحة العمل المشترك مطابقات للبيئة؟"
      },
      answer: {
        fr: "Oui, nous offrons café et thé illimités à tous nos membres. De plus, nous disposons d'une cuisine équipée et d'un espace café avec des snacks et boissons à prix modiques.",
        en: "Yes, we offer unlimited coffee and tea to all our members. In addition, we have a well-equipped kitchen and a café area with affordable snacks and drinks.",
        ar: "نعم، نقدم كافيين وثياب مجانية لكل عضو. بالإضافة إلى ذلك، لدينا مطبخ مجهز ومساحة كافيه متوفرة بأسعار مخفضة."
      },
      category: "services"
    },
    {
      question: {
        fr: "Est-il possible d'imprimer des documents ?",
        en: "Is it possible to print documents?",
        ar: "هل يمكن طباعة المستندات؟"
      },
      answer: {
        fr: "Oui, nous disposons d'imprimantes multifonctions (impression, copie, scan) disponibles pour tous les membres. Les tarifs d'impression varient selon votre formule d'adhésion.",
        en: "Yes, we have multifunctional printers (printing, copying, scanning) available for all members. Printing costs vary depending on your subscription package.",
        ar: "نعم، لدينا مطابقات متعددة الأجهزة (طباعة، نسخة، تشفير) متوفرة لكل عضو. تكلفة الطباعة تختلف بناءً على نوع الاشتراك."
      },
      category: "services"
    },
    {
      question: {
        fr: "Proposez-vous un service de domiciliation d'entreprise ?",
        en: "Do you offer an office relocation service?",
        ar: "هل تقدم خدمات نقل مكتب؟"
      },
      answer: {
        fr: "Oui, les membres avec un abonnement Pro ou Premium peuvent utiliser notre adresse comme adresse professionnelle. Des services postaux complémentaires sont également disponibles moyennant un supplément.",
        en: "Yes, members with a Pro or Premium subscription can use our address as their professional address. Additional postal services are available at an additional cost.",
        ar: "نعم، الأعضاء الذين يمتلكون الاشتراك Pro أو Premium يمكنهم استخدام عنواننا كعنوان عملهم. تتوفر خدمات البريد الإلكتروني والبريد المطبوعة بسعر إضافي."
      },
      category: "services"
    },
    {
      question: {
        fr: "Organisez-vous des événements pour les membres ?",
        en: "Do you organize events for members?",
        ar: "هل تقدم خدمات إنشاء الأحداث؟"
      },
      answer: {
        fr: "Absolument ! Nous organisons régulièrement des événements de networking, des ateliers professionnels, des petits-déjeuners communautaires et d'autres activités pour favoriser les échanges entre membres.",
        en: "Absolutely! We regularly organize networking events, professional workshops, community breakfasts, and other activities to foster connections among members.",
        ar: "نعم، نقوم بتنظيم الأحداث بشكل منتظم مثل الأنشطة التحفيزية، وورش العمل المهنية، ووجبات الغداء المفتوحة، وعديد الأنشطة الأخرى لتعزيز التواصل بين الأعضاء."
      },
      category: "services"
    },
    // Réservations
    {
      question: {
        fr: "Comment puis-je réserver une salle de réunion ?",
        en: "How can I book a meeting room?",
        ar: "كيف يمكنني حجز غرفة اجتماعية؟"
      },
      answer: {
        fr: "Les réservations de salles se font via notre plateforme en ligne ou sur place. Selon votre formule d'adhésion, vous bénéficiez d'un certain nombre d'heures incluses par mois.",
        en: "Reservations for meeting rooms can be made through our online platform or on-site. Depending on your subscription package, you receive a certain number of included hours per month.",
        ar: "يمكن حجز غرف اجتماعية عبر الإنترنت أو على الموقع. بناءً على نوع الاشتراك، يتم توفير عدد معين من الأوقات المضافة في الشهر."
      },
      category: "booking"
    },
    {
      question: {
        fr: "Puis-je annuler ma réservation de salle ?",
        en: "Can I cancel my meeting room reservation?",
        ar: "هل يمكنني إلغاء حجز غرفة اجتماعية؟"
      },
      answer: {
        fr: "Oui, vous pouvez annuler votre réservation jusqu'à 24 heures à l'avance sans frais. Pour les annulations tardives, les heures réservées seront tout de même décomptées de votre crédit ou facturées.",
        en: "Yes, you can cancel your meeting room reservation up to 24 hours in advance without any fees. Late cancellations will still deduct the reserved hours from your credit or be charged.",
        ar: "نعم، يمكنك إلغاء حجز غرفة اجتماعية في أي وقت قبل 24 ساعة دون أي رسوم. إذا كانت الإلغاء متأخرًا، سيتم إزالة الأوقات المضافة من سجل الحجوزات."
      },
      category: "booking"
    },
    {
      question: {
        fr: "Est-il possible de réserver un espace pour un événement ?",
        en: "Can I book an event space?",
        ar: "هل يمكن حجز مساحة احتضان الأحداث؟"
      },
      answer: {
        fr: "Oui, nous proposons la location d'espaces pour des événements, des workshops ou des séminaires. Contactez notre équipe pour discuter de vos besoins spécifiques et obtenir un devis personnalisé.",
        en: "Yes, we offer space for events, workshops, or seminars. Contact our team to discuss your specific needs and receive a custom quote.",
        ar: "نعم، نقدم مساحات لتنظيم الأحداث، وورش العمل، أو Seminars. يرجى التواصل مع فريقنا لمناقشة احتياجاتك الخاصة وتقديم عرض مخصص."
      },
      category: "booking"
    },
    {
      question: {
        fr: "Y a-t-il un système de réservation pour les espaces de travail ?",
        en: "Is there a reservation system for workspaces?",
        ar: "هل تقدم نظام حجز لمساحات العمل؟"
      },
      answer: {
        fr: "Nos espaces de travail en open space sont disponibles sans réservation pour les membres (selon les termes de leur formule). Les bureaux privés et salles de réunion nécessitent une réservation préalable.",
        en: "Our open space workspaces are available without reservation for members (according to their subscription terms). Private offices and meeting rooms require a prior reservation.",
        ar: "مساحات العمل في مساحات العمل المشتركة متاحة دون حجز للعضويين (وفقًا للشروط الخاصة بالاشتراكات). أما مكاتب خاصة وغرف اجتماعية، فتحدد الحاجة إلى حجز مسبق."
      },
      category: "booking"
    },
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const translations = {
    search: {
      fr: "Rechercher une question...",
      en: "Search a question...",
      ar: "ابحث عن سؤال..."
    },
    categories: {
      fr: { all: "Toutes les questions", general: "Général", membership: "Adhésion", services: "Services", booking: "Réservations" },
      en: { all: "All questions", general: "General", membership: "Membership", services: "Services", booking: "Bookings" },
      ar: { all: "جميع الأسئلة", general: "عام", membership: "العضوية", services: "الخدمات", booking: "الحجوزات" }
    },
    stillHaveQuestions: {
      fr: "Vous avez d'autres questions ?",
      en: "Still have questions?",
      ar: "هل لديك أسئلة أخرى؟"
    },
    contactUs: {
      fr: "Nous contacter",
      en: "Contact us",
      ar: "اتصل بنا"
    }
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section with Modern Gradient */}
      <section 
        ref={heroRef}
        className={`bg-gradient-to-r from-coworking-primary via-blue-600 to-blue-700 text-white py-20
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">FAQ</h1>
            <Select value={language} onValueChange={(value: 'fr' | 'en' | 'ar') => setLanguage(value)}>
              <SelectTrigger className="w-[180px] bg-white/10 border-white/20 transition-all hover:bg-white/20">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {language === 'fr' ? 'Français' : language === 'en' ? 'English' : 'العربية'}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl animate-fade-in">
            {language === 'fr' ? 
              "Trouvez rapidement des réponses à vos questions sur notre espace de coworking et nos services." :
              language === 'en' ?
              "Quickly find answers to your questions about our coworking space and services." :
              "اعثر بسرعة على إجابات لأسئلتك حول مساحة العمل المشترك والخدمات لدينا."}
          </p>
        </div>
      </section>

      {/* Search & Filter with Glass Morphism */}
      <section 
        ref={searchRef}
        className={`py-10 bg-gray-50
          ${searchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={translations.search[language]}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-coworking-primary focus:border-coworking-primary bg-white/50 transition-all duration-300 hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.entries(translations.categories[language]).map(([key, label]) => (
                <button
                  key={key}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === key 
                      ? 'bg-coworking-primary text-white shadow-lg' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items with Animation */}
      <section 
        ref={faqRef}
        className={`py-12 
          ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {filteredItems.length > 0 ? (
              <div className="space-y-4">
                {filteredItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg transform hover:scale-[1.01]"
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none transition-colors hover:bg-gray-50"
                      onClick={() => toggleItem(index)}
                    >
                      <h3 className="text-lg font-semibold">{item.question[language]}</h3>
                      {openItems.includes(index) ? (
                        <ChevronUp className="flex-shrink-0 text-coworking-primary transition-transform duration-300 transform rotate-0" size={20} />
                      ) : (
                        <ChevronDown className="flex-shrink-0 text-coworking-primary transition-transform duration-300 transform rotate-0" size={20} />
                      )}
                    </button>
                    <div 
                      className={`px-6 transition-all duration-700 ease-in-out ${
                        openItems.includes(index) 
                          ? 'pb-4 max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <p className="text-gray-600">{item.answer[language]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'fr' ? 'Aucun résultat trouvé' :
                   language === 'en' ? 'No results found' :
                   'لم يتم العثور على نتائج'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'fr' ? 'Nous n\'avons pas trouvé de réponse correspondant à votre recherche.' :
                   language === 'en' ? 'We couldn\'t find an answer matching your search.' :
                   'لم نتمكن من العثور على إجابة تطابق بحثك.'}
                </p>
                <Link to="/contact" className="btn-primary transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                  {translations.contactUs[language]}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section with Modern Design */}
      <section 
        ref={contactRef}
        className={`py-16 bg-gradient-to-b from-gray-50 to-white
          ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4 text-gradient">{translations.stillHaveQuestions[language]}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {language === 'fr' ? 
              "Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement." :
              language === 'en' ?
              "Our team is here to help. Don't hesitate to contact us directly." :
              "فريقنا هنا للمساعدة. لا تتردد في الاتصال بنا مباشرة."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary transform hover:scale-105 transition-transform duration-300 hover:shadow-md active:scale-95">
              {translations.contactUs[language]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
