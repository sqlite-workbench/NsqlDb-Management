import React, {useState} from 'react'
import {TextField, IconButton, Tooltip, Chip} from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ApiIcon from '@mui/icons-material/Api';
import HttpIcon from '@mui/icons-material/Http';
import CodeIcon from '@mui/icons-material/Code';
import SendIcon from '@mui/icons-material/Send';
import "../CSS/Doc.css"
import ContextRouter from "../contextAPI/ContextRouter"
import { useContext } from 'react'

export default function Documentation() {
  const context = useContext(ContextRouter)
  const [copiedField, setCopiedField] = useState(null)
  
  const handleClick = (name, value) => {
    navigator.clipboard.writeText(value);
    context.setAlert({status:true, msg:`${name} Copied Successfully`, color:"green"})
    setCopiedField(name)
    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }
  return (
    <div className='doc-main'>
      <div className='doc-sub'>
        {/* Header */}
        <div className='doc-header'>
          <div className='header-content'>
            <MenuBookIcon className='header-icon' />
            <h2 className='header-title'>API Documentation</h2>
          </div>
          <p className='header-subtitle'>
            Complete guide to integrate NSQLDB API into your application
          </p>
        </div>

        {/* API Endpoint Section */}
        <div className='doc-section'>
          <div className='section-header'>
            <ApiIcon className='section-icon' />
            <h3 className='section-title'>API Endpoint</h3>
          </div>
          <div className='doc-field'>
            <div className='field-wrapper'>
              <TextField 
                disabled 
                fullWidth 
                variant='outlined' 
                value={"https://nsqldb.glitch.me/run"} 
                label="API Endpoint"
                className='doc-input'
              />
              <Tooltip title={copiedField === 'API' ? "Copied!" : "Copy API Endpoint"} arrow>
                <IconButton 
                  className='copy-btn'
                  onClick={() => handleClick("API", "https://nsqldb.glitch.me/run")}
                >
                  {copiedField === 'API' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div className='field-hint'>
              <span className='hint-icon'>🔗</span>
              <span className='hint-text'>Base URL for all API requests</span>
            </div>
          </div>
        </div>

        {/* Method Section */}
        <div className='doc-section'>
          <div className='section-header'>
            <HttpIcon className='section-icon' />
            <h3 className='section-title'>HTTP Method</h3>
          </div>
          <div className='doc-field'>
            <div className='field-wrapper'>
              <TextField 
                disabled 
                fullWidth 
                variant='outlined' 
                value={"POST"} 
                label="Method"
                className='doc-input'
              />
              <Chip label="POST" className='method-chip' />
              <Tooltip title={copiedField === 'METHOD' ? "Copied!" : "Copy Method"} arrow>
                <IconButton 
                  className='copy-btn'
                  onClick={() => handleClick("METHOD", "POST")}
                >
                  {copiedField === 'METHOD' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Request Headers Section */}
        <div className='doc-section'>
          <div className='section-header'>
            <SendIcon className='section-icon' />
            <h3 className='section-title'>Request Headers</h3>
          </div>
          <div className='doc-field'>
            <div className='field-wrapper'>
              <TextField 
                disabled 
                fullWidth 
                variant='outlined' 
                value={"{apikey:your_key,content-type:application/json}"} 
                label="Request Headers"
                className='doc-input code-input'
              />
              <Tooltip title={copiedField === 'REQUEST HEADER' ? "Copied!" : "Copy Headers"} arrow>
                <IconButton 
                  className='copy-btn'
                  onClick={() => handleClick("REQUEST HEADER", "{apikey:your_key,content-type:application/json}")}
                >
                  {copiedField === 'REQUEST HEADER' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div className='field-hint'>
              <span className='hint-icon'>🔑</span>
              <span className='hint-text'>Include your API key in the headers</span>
            </div>
          </div>
        </div>

        {/* Request Body Section */}
        <div className='doc-section'>
          <div className='section-header'>
            <CodeIcon className='section-icon' />
            <h3 className='section-title'>Request Body</h3>
          </div>
          <div className='doc-field'>
            <div className='field-wrapper'>
              <TextField 
                disabled 
                fullWidth 
                variant='outlined' 
                value={"{dbname:your_database_name,query:sqlite_query}"} 
                label="Request Body"
                className='doc-input code-input'
              />
              <Tooltip title={copiedField === 'REQUEST BODY' ? "Copied!" : "Copy Body"} arrow>
                <IconButton 
                  className='copy-btn'
                  onClick={() => handleClick("REQUEST BODY", "{dbname:your_database_name,query:sqlite_query}")}
                >
                  {copiedField === 'REQUEST BODY' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div className='field-hint'>
              <span className='hint-icon'>📦</span>
              <span className='hint-text'>JSON payload with database name and SQL query</span>
            </div>
          </div>
        </div>

        {/* Example Section */}
        <div className='doc-section example-section'>
          <div className='section-header'>
            <CodeIcon className='section-icon' />
            <h3 className='section-title'>Complete Example</h3>
          </div>
          <div className='doc-field'>
            <div className='field-wrapper'>
              <TextField 
                disabled 
                fullWidth 
                multiline 
                rows={4}
                variant='outlined' 
                value={"request.post(\n  'https://nsqldb.glitch.me/run',\n  {dbname:'your_db_name', query:'select * from table;'},\n  {headers: {'content-type':'application/json', 'apikey':'your_apikey'}}\n);"} 
                label="Example Request"
                className='doc-input code-input example-input'
              />
              <Tooltip title={copiedField === 'EXAMPLE' ? "Copied!" : "Copy Example"} arrow>
                <IconButton 
                  className='copy-btn example-copy-btn'
                  onClick={() => handleClick("EXAMPLE", "request.post('https://nsqldb.glitch.me/run', {dbname:'your_db_name', query:'select * from table;'}, {headers: {'content-type':'application/json', 'apikey':'your_apikey'}});")}
                >
                  {copiedField === 'EXAMPLE' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div className='field-hint'>
              <span className='hint-icon'>💡</span>
              <span className='hint-text'>Full example showing how to make API requests</span>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className='doc-footer'>
          <div className='footer-item'>
            <span className='footer-icon'>📚</span>
            <span className='footer-text'>Click any field to copy to clipboard</span>
          </div>
          <div className='footer-item'>
            <span className='footer-icon'>🔒</span>
            <span className='footer-text'>Keep your API key secure</span>
          </div>
        </div>
      </div>
    </div>
  )
}
