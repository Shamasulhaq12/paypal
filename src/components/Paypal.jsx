import { useRef, useEffect} from 'react'

export default function Paypal() {

     const paypal = useRef()

     useEffect(() => {
        window.paypal.Buttons({
             createOrder: (data, actions, err) => {
               return actions.order.create({
                    //creating start here
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                         description: "Beautiful looking T-shirt",
                         amount: {
                              currency_code: "CAD",
                              value: 400.00
                         },
                    },
                  ],
                  // Pre-fill email address
                  payer: {
                      email_address: "customer@example.com",
                    zip_code: "94107", 
                    },
                  // Hide shipping and billing address section
                  application_context: {
                       shipping_preference: "NO_SHIPPING",
                       billing_preference: "NO_BILLING"
                  }
                  //creating ends here
               })
             },
             onApproved: async (data, actions) => {
                 const order = await actions.order.capture()
                 console.log(order)
             },
             onError: (err) => {
               console.log(err)
             }
        }).render(paypal.current)
     }, [])

     return (
          <div>
               <div ref={paypal}></div>
          </div>
     )
}
