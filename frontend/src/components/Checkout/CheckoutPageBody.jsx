import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import Payment from './Payment';

const steps = ['Sign in', 'Delivery Address', 'Order Summary', 'Payment'];

const CheckoutPageBody = () => {
    const [activeStep, setActiveStep] = useState(0);
    const location = useLocation();

    const querySearch = new URLSearchParams(location.search);
    const step = parseInt(querySearch.get('step')) || 0; // Ensure step is an integer

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className='w-full container mt-20 text-primary'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                        <div>
                            { step === 2 ? <DeliveryAddressForm /> : 
                                step === 3 ? <OrderSummary /> :
                                step === 4 ? <Payment/>
                                : <div>An Error Occured</div>
                            }
                        </div>
                    </React.Fragment>
                )}
            </Box>
            <Footer />
        </div>
    );
}

export default CheckoutPageBody;



// import React from 'react'
// import Footer from '../Footer/Footer'
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useLocation } from 'react-router-dom';
// import DeliveryAddressForm from './DeliveryAddressForm';
// import OrderSummary from './OrderSummary';

// const steps = ['Sign in', 'Delivery Address', 'Order Summary', 'Payment'];

// const CheckoutPageBody = () => {
//     const [activeStep, setActiveStep] = React.useState(0);
//     const location = useLocation();
//     //const [skipped, setSkipped] = React.useState(new Set());

//     // const isStepOptional = (step) => {
//     //     return step === 1;
//     // };

//     // const isStepSkipped = (step) => {
//     //     return skipped.has(step);
//     // };
//     const querySearch = new URLSearchParams(location.search);
//     const step = querySearch.get('step');

//     const handleNext = () => {
//         //let newSkipped = skipped;
//         // if (isStepSkipped(activeStep)) {
//         // newSkipped = new Set(newSkipped.values());
//         // newSkipped.delete(activeStep);
//         // }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         //setSkipped(newSkipped);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     // const handleSkip = () => {
//     //     if (!isStepOptional(activeStep)) {
//     //     // You probably want to guard against something like this,
//     //     // it should never occur unless someone's actively trying to break something.
//     //     throw new Error("You can't skip a step that isn't optional.");
//     //     }

//     //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     //     setSkipped((prevSkipped) => {
//     //     const newSkipped = new Set(prevSkipped.values());
//     //     newSkipped.add(activeStep);
//     //     return newSkipped;
//     //     });
//     // };

//     const handleReset = () => {
//         setActiveStep(0);
//     };

//     return (
//         <div className='w-full container mt-20 text-primary'>
//             <Box sx={{ width: '100%' }}>
//             <Stepper activeStep={step}>
//                 {steps.map((label, index) => {
//                 const stepProps = {};
//                 const labelProps = {};
//                 // if (isStepOptional(index)) {
//                 //     labelProps.optional = (
//                 //     <Typography variant="caption">Optional</Typography>
//                 //     );
//                 // }
//                 // if (isStepSkipped(index)) {
//                 //     stepProps.completed = false;
//                 // }
//                 return (
//                     <Step key={label} {...stepProps}>
//                     <StepLabel {...labelProps}>{label}</StepLabel>
//                     </Step>
//                 );
//                 })}
//             </Stepper>
//             {activeStep === steps.length ? (
//                 <React.Fragment>
//                 <Typography sx={{ mt: 2, mb: 1 }}>
//                     All steps completed - you&apos;re finished
//                 </Typography>
//                 {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                     <Box sx={{ flex: '1 1 auto' }} />
//                     <Button onClick={handleReset}>Reset</Button>
//                 </Box> */}
//                 </React.Fragment>
//             ) : (
//                 <React.Fragment>
//                 {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
//                 <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                     <Button
//                     color="inherit"
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                     sx={{ mr: 1 }}
//                     >
//                     Back
//                     </Button>
//                     <Box sx={{ flex: '1 1 auto' }} />
//                     {/* {isStepOptional(activeStep) && (
//                     <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                         Skip
//                     </Button>
//                     )} */}

//                     {/* <Button onClick={handleNext}>
//                     {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                     </Button> */}
//                 </Box>
//                 <div>
//                     { step == 2 ? <DeliveryAddressForm/> : <OrderSummary/> }
//                 </div>
//                 </React.Fragment>
//             )}
//             </Box>
//             <Footer/>
//         </div>
//     );
// }

// export default CheckoutPageBody
