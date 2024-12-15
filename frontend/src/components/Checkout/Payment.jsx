import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from '@/Alert/AlertMessage';
import { paymentIntentAPI, paymentVerificationAPI } from '@/APIServices/Stripe/ordersPaymentAPI';

const Payment = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
    console.log("Order Id: ", orderId);
    const paymentMutation = useMutation({
        mutationKey: ["checkout"],
        mutationFn: paymentIntentAPI,
    });

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (elements === null) {
            return;
        }
        const { error: submitErr } = await elements.submit();
        if (submitErr) {
            setErrorMessage(submitErr.message);
            return;
        }
        try {
            await paymentMutation.mutateAsync(orderId);
            const clientSecret = paymentMutation.data?.clientSecret;
            console.log("Client Secret: ", clientSecret);
            if (clientSecret) {
                const { error, paymentIntent } = await stripe.confirmPayment({
                    elements,
                    clientSecret,
                    confirmParams: {
                        return_url: "http://localhost:3000/success",
                    },
                });
                if (error) {
                    setErrorMessage(error?.message);
                } else {
                    const verificationResponse = await paymentVerificationAPI(paymentIntent?.id);
                    if (verificationResponse.status === 'success') {
                        // Handle successful verification (e.g., navigate to success page)
                        window.location.href = "/success";
                    } else {
                        setErrorMessage('Payment verification failed');
                    }
                }
            }
        } catch (error) {
            setErrorMessage(error?.message);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-96 mx-auto my-4 p-6 box bg-background rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <PaymentElement />
                </div>
                {paymentMutation?.isPending && (
                    <AlertMessage type="loading" message="Processing please wait..." />
                )}
                {paymentMutation?.isError && (
                    <AlertMessage
                        type="error"
                        message={paymentMutation?.error?.response?.data?.message}
                    />
                )}
                <button className="w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Pay
                </button>
                {errorMessage && (
                    <div className="text-red-500 mt-4">{errorMessage}</div>
                )}
            </form>
        </div>
    );
};

export default Payment;




// import React, { useState } from 'react'
// import { useLocation } from 'react-router-dom';
// import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useMutation } from "@tanstack/react-query";
// import AlertMessage from '@/Alert/AlertMessage';
// import { paymentIntentAPI } from '@/APIServices/Stripe/ordersPaymentAPI';


// const Payment = () => {
//     const [errorMessage, setErrorMessage] = useState(null);
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const orderId = queryParams.get('orderId');
//     console.log("Order Id: ",orderId);
//     const paymentMutation = useMutation({
//         mutationKey: ["checkout"],
//         mutationFn: paymentIntentAPI,
//     });

//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (elements === null) {
//             return;
//         }
//         const { error: submitErr } = await elements.submit();
//         if (submitErr) {
//             return;
//         }
//         try {
//         paymentMutation
//             .mutateAsync(orderId)
//             .then(async () => {
//             const { error } = await stripe.confirmPayment({
//                 elements,
//                 clientSecret: paymentMutation.data?.clientSecret,
//                 confirmParams: {
//                 return_url: "http://localhost:3000/success",
//                 },
//             });
//             setErrorMessage(error?.message);
//             })
//             .catch((e) => console.log(e));
//         } catch (error) {
//             setErrorMessage(error?.message);
//         }
//     };
//     console.log(paymentMutation);
//     return (
//         <div className="flex justify-center items-center">
//         <form
//             onSubmit={handleSubmit}
//             className="w-96 mx-auto my-4 p-6 box bg-background rounded-lg shadow-md"
//         >
//             {/* Stripe payment element */}
//             <div className="mb-4">
//             <PaymentElement />
//             </div>
//             {/* Display loading */}
//             {paymentMutation?.isPending && (
//             <AlertMessage type="loading" message="Proccessing please wait..." />
//             )}

//             {/* Display error */}
//             {paymentMutation?.isError && (
//             <AlertMessage
//                 type="error"
//                 message={mutation?.error?.response?.data?.message}
//             />
//             )}
//             <button className="w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2">
//             Pay
//             </button>
//             {errorMessage && (
//             <div className="text-red-500 mt-4">{errorMessage}</div>
//             )}
//         </form>
//         </div>
//     );
// }

// export default Payment