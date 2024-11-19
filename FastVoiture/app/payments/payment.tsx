// import React, { useState } from "react";
// import { View } from "react-native";
// import {CardField} from "@stripe/stripe-react-native";



// function PaymentScreen() {
//     const [card, setCard] = useState(null);
//     // ...
//     return (
//       <View>
//         <CardField
//           postalCodeEnabled={true}
//           placeholders={{
//             number: '4242 4242 4242 4242',
//           }}
//           cardStyle={{
//             backgroundColor: '#FFFFFF',
//             textColor: '#000000',
//           }}
//           style={{
//             width: '100%',
//             height: 50,
//             marginVertical: 30,
//           }}
//           onCardChange={(cardDetails) => {
//             setCard(cardDetails);
//           }}
//           onFocus={(focusedField) => {
//             console.log('focusField', focusedField);
//           }}
//         />
//       </View>
//     );
//   }