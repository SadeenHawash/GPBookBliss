// // PDFViewer.jsx
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// const PDFViewer = () => {
//     const location = useLocation();
//     const { pdfUrl } = location.state || {};

//     if (!pdfUrl) {
//         return <div>No PDF URL provided</div>;
//     }

//     return (
//         <div style={{ height: '100vh' }}>
//             <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${Worker.version}/build/pdf.worker.min.js`}>
//                 <Viewer fileUrl={pdfUrl} />
//             </Worker>
//         </div>
//     );
// };

// export default PDFViewer;
