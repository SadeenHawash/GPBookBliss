import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

const steps = ['Placed', 'Order Confirmed', 'Shipped', 'Out For Delivery', 'Delivered'];

const OrderTracker = ({status}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();

    const querySearch = new URLSearchParams(location.search);
    const step = parseInt(querySearch.get('step')) || 0; // Ensure step is an integer

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className='w-full text-primary box py-5 pr-14 rounded-lg flex items-center'>
            <div className='w-[90%] container'>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className='w-[10%]'> 
                Cancel Order
            </div>
        </div>
    );
}

export default OrderTracker


// <div className='container text-primary box p-6 rounded-lg flex'>
        //     <Box sx={{ width: '100%' }}>
        //         <Stepper activeStep={step} alternativeLabel>
        //             {steps.map((label) => (
        //                 <Step key={label}>
        //                     <StepLabel>{label}</StepLabel>
        //                 </Step>
        //             ))}
        //         </Stepper>
        //         {activeStep === steps.length ? (
        //             <React.Fragment>
        //                 <Typography sx={{ mt: 2, mb: 1 }}>
        //                     All steps completed - you&apos;re finished
        //                 </Typography>
        //             </React.Fragment>
        //         ) : (
        //             <React.Fragment>
        //                 {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        //                     <Button
        //                         color="inherit"
        //                         disabled={activeStep === 0}
        //                         onClick={handleBack}
        //                         sx={{ mr: 1 }}
        //                     >
        //                         Back
        //                     </Button>
        //                     <Box sx={{ flex: '1 1 auto' }} />
        //                 </Box> */}
        //                 {/* <div>
        //                     { step === 2 ? <DeliveryAddressForm /> : <OrderSummary /> }
        //                 </div> */}
        //             </React.Fragment>
        //         )}
        //     </Box>
        // </div>