import PayPal from 'expo-paypal';

const PaymentScreen=()=>{

    const sendPayment = async (startProcess) => {
        if (amount === null) {
          alert("Please enter amount")
          return;
        }
        startProcess()
      };
  
  
      <View style={{flex:1}}>
       <PayPal
          popupContainerStyle={{ height: 400 }}
          onPress={(startProcess) => sendPayment(startProcess)}
          title="Submit"
          buttonStyles={styles?.Button}
          btnTextStyles={styles?.text}
          amount={23}//i.e $20
          success={(a) => {
                //callback after payment has been successfully compleated
                console.log(a)
          }}
          failed={(a) => {
                //callback if payment is failed
                console.log(a)
          }}
          />
      </View>
      }

export default PaymentScreen      