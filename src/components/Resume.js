import React,{useState} from 'react';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import pdfFile from './pdf/resume.pdf'

function Resume() {
    const [defaultPdfFile] = useState(pdfFile)
    //create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    console.log()
  


    return(
        <div className='pdf-container'>
            {defaultPdfFile&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <Viewer fileUrl={defaultPdfFile}
                plugins={[defaultLayoutPluginInstance]} />
            </Worker></>}
        </div>
    )

}
export default Resume

