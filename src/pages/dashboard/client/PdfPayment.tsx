import { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20, // reduced from 30
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    opacity: 0.8,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    color: '#6b7280',
    width: '40%',
  },
  value: {
    fontSize: 10,
    color: '#1f2937',
    fontWeight: 'bold',
    width: '60%',
  },
  statusContainer: {
    backgroundColor: 'rgb(74 222 128)',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  reference: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  referenceText: {
    fontSize: 9,
    fontFamily: 'Courier',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: '1 solid #e5e7eb',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#6b7280',
  },
});


// PDF Document Component
const PaymentConfirmation = ({ payment }) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
   useEffect(() => {
    if (payment?.paymentBooking?.[0]?.references) {
      QRCode.toDataURL(payment.paymentBooking[0].references)
        .then((url) => setQrCodeDataURL(url))
        .catch((err) => console.error(err));
    }
  }, [payment]);
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(amount / 1000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>Reçu de Paiement</Text>
          <Text style={pdfStyles.subtitle}>Djerba Coworking - Système de Réservation</Text>
        </View>

        {/* Status */}
        <View style={pdfStyles.statusContainer}>
          <Text style={pdfStyles.statusText}>
            Statut: Terminé
          </Text>
        </View>

        {/* Amount */}
        <Text style={pdfStyles.amount}>
          {payment.price} TND
        </Text>

        {/* Reference */}
        <View style={pdfStyles.reference}>
          <Text style={pdfStyles.referenceText}>
            Référence: {payment.paymentBooking[0].references}
          </Text>
        </View>

        {/* Payment Information */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Informations de Paiement</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>ID Paiement:</Text>
            <Text style={pdfStyles.value}>{payment.id}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Réservation:</Text>
            <Text style={pdfStyles.value}>{payment.membership}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Date de Paiement:</Text>
            <Text style={pdfStyles.value}>{formatDate(payment.paymentBooking[0].payment_date)}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Informations Client</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Nom:</Text>
            <Text style={pdfStyles.value}>
              {payment?.users.name} {payment?.users.last_name}
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Email:</Text>
            <Text style={pdfStyles.value}>{payment?.users.email}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Téléphone:</Text>
            <Text style={pdfStyles.value}>{payment?.users.phone}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Type d'abonnement:</Text>
            <Text style={pdfStyles.value}>{payment?.membership}</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Détails de la Réservation</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Date de début:</Text>
            <Text style={pdfStyles.value}>
              {new Date(payment?.date_start).toLocaleDateString('fr-FR')}
            </Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Heure:</Text>
            <Text style={pdfStyles.value}>{payment?.time_start}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Durée:</Text>
            <Text style={pdfStyles.value}>{payment?.duration}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Créé le:</Text>
            <Text style={pdfStyles.value}>{formatDate(payment?.createdAt)}</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
         {qrCodeDataURL && (
          <Image src={qrCodeDataURL} style={{ width: 100, height: 100 }} />
        )}
        </View>

        {/* Footer */}
        <View style={pdfStyles.footer}>
          <Text style={pdfStyles.footerText}>
            Document généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
          </Text>
          <Text style={pdfStyles.footerText}>
            Djerba Coworking - Tous droits réservés
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentConfirmation;