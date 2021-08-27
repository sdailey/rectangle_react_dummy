// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import { NavLink as RouterNavLink, RouteComponentProps } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { findIana } from 'windows-iana';
import { Event } from 'microsoft-graph';

import { getEmails } from './GraphService';

import { Message } from 'microsoft-graph';

import { AuthenticatedTemplate } from '@azure/msal-react';

import { useAppContext } from './AppContext';
import CalendarDayRow from './CalendarDayRow';
import './Calendar.css';

export default function Inbox(props: RouteComponentProps) {
  const app = useAppContext();
  const [messages, setMessages] = useState<Message[]>();
  
  console.log("messages");
  
  useEffect(() => {
    console.log("trying");
    // const loadMessages = async() => {
    //   console.log("trying2");
    //   if (app.user != undefined && !messages) { //  && 
    //     console.log("trying3");
    //     try {
    //       console.log("trying4");
    //       // const ianaTimeZones = findIana(app.user?.timeZone!);
    //       const messages = await getEmails(app.authProvider!);
          
    //       console.log(messages);
    //       setMessages(messages);
    //     } catch (err: any) {
    //       app.displayError!(err.message);
    //     }
    //   }
    // };

    // loadMessages();
  });

  // <ReturnSnippet>
  if (app.user == undefined ) {
    
    return (
      <div className="mb-3">
        
        <RouterNavLink to="/" className="btn btn-light btn-sm" exact>Must log back in</RouterNavLink>
        
        
      </div>
      
    )
  }
  return (
    <AuthenticatedTemplate>
      <div className="mb-3">
        
        <RouterNavLink to="/newemail" className="btn btn-light btn-sm" exact>New email</RouterNavLink>
        
        <p> pulled em </p>
        
      </div>
      
    </AuthenticatedTemplate>
  );
  // </ReturnSnippet>
}
