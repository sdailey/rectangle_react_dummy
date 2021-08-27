
import './App.css';
import React from 'react';
import { useAppContext } from './AppContext';

function TopLevelApp (props) {
  const app = useAppContext(); // this "fetches" the emails
  
  return(
    
    <Rectangle {... app} />
    
  )
}
export default TopLevelApp;

function UIbar(props) {
  return (
    <div className='row  bottomborder'>
        
      <div className='column  biggerc rightborder'>
        <div className='row'>
    
          <div className='column smallerc rightborder'>
            <h3><u>Inbox</u></h3>
          </div>
          
          <div className='column smallerc'>
            <h3>TeamBox</h3>
          </div>
        </div>  
      
      </div>
      <div className='column smallerc'>
        
          <h3>Cards</h3>
        
      </div>
    </div>
  );
}


// function EmailListItem(props) { // email
  
class EmailPersonName extends React.Component {
  render() {
    
    return (
      <div className='emailsender' onClick={this.props.onClickEmailSenderWrapped}>
        {this.props.name}
      </div>
    )
  }
}
  
  
class EmailListItem extends React.Component {
  
  render() {
    
    const cardnameButtons = this.props.email.cardnames.map((cardName) => {
      
      return (
        <li key={cardName} className='cardname'>
          <span onClick={() => this.props.onClickEmailCardItem(cardName,this.props.email.id)}>{cardName}</span>
        </li>
      );
    });
    
    return (
      <li className='pillbox emailpill'>
        <div className='sendersbar'>
          <EmailPersonName onClickEmailSenderWrapped={() => this.props.onClickEmailSender(this.props.email.id,this.props.email.subject)} name={this.props.email.senderName} />
        </div>
        <div className='subjectbar'>
          {this.props.email.subject}
        </div>
        <ul className='cardbar'>
            <li className='cardplus' onClick={()=> this.props.onClickEmailAddToCard(this.props.email.id)}>+</li>
            
            {cardnameButtons}
        </ul>
      </li>
    );
  }
}



class EmailsColumn extends React.Component { // gets emails
  
  
  render() {
    
    // we will fill out the sender's name
    var processed_emails = [] 
    for (let i = 0; i < this.props.emails.length; i++) { 
      
      var _email = this.props.emails[i]
      
      _email.senderName = ""
      if (_email.sender_doc != null) {
        
        _email.senderName = _email.sender_doc.name
        
      } else {
        var _senderName = ""
        
        for (let _i = 0; _i < this.props.shown_people.length; _i++) {
          
          if (this.props.shown_people[_i].id === _email.sender_id) {
            
            _senderName = this.props.shown_people[_i].name
          }
        }
        _email.senderName = _senderName
      }
      processed_emails.push(_email)
    }
    
    return (
      <div className='column biggerc rightborder'>
        <ul className='columnlistcontainerlistcontainer'>
          
          {(processed_emails || []).map(email => (
            <EmailListItem key={email.id} onClickEmailSender={this.props.onClickEmailSender} email={email} onClickEmailCardItem={this.props.onClickEmailCardItem} onClickEmailAddToCard={this.props.onClickEmailAddToCard} />
          ))}
          
        </ul>
      </div>
    );
    
  }
}



class CardListItem extends React.Component {
  
  render() {
    
    const cardListEmails = this.props.card.pres_pinnedEmails.map((email) => {
      
      return (
        <li key={"email"+email.id} className='pinneditem'>
          <span onClick={() => this.props.onClickCardListItem(this.props.card.title,"email",email.id)}>✉️ {shortenStringIfLongWithEllipsis(email.subject,22)}</span>
        </li>
      );
    });
    
    const cardListFiles = this.props.card.pinnedFiles.map((file) => {
      
      return (
        <li key={"file"+file.id} className='pinneditem'>
          <span onClick={() => this.props.onClickCardListItem(this.props.card.title,"file",file.id)}>📎 {shortenStringIfLongWithEllipsis(file.title,22)}</span>
        </li>
      );
    });
    
    const cardListCalAppts = this.props.card.pinnedCalendarAppointments.map((appt) => {
      
      return (
        <li key={"appt"+appt.id} className='pinneditem'>
          <span onClick={() => this.props.onClickCardListItem(this.props.card.title,"appt",appt.id)}>🗓 {shortenStringIfLongWithEllipsis(appt.title,22)}</span>
        </li>
      );
    });
    
    const cardListStakeholders = this.props.card.pres_stakeholders.map((person) => {
      
      return (
        <li key={"person" + person.id} className='cardstakeholder'>
          <span onClick={() => this.props.onClickCardPerson(this.props.card.id,person.id)}>{shortenStringIfLongWithEllipsis(person.first_or_nickname,19)}</span>
        </li>
      );
    });
    
    return (
      
      <div onClick={()=> this.props.onClickCard(this.props.card.title)} className='pillbox cardpill center'>
          <div className='titlebar'>
            {this.props.card.title}
          </div>
          
          <ul className='cardlistcontainer'>
            {cardListEmails}
            
            {cardListFiles}
            
            {cardListCalAppts}
            
          </ul>
          
          <ul className='cardstakeholdersbar'>
            {cardListStakeholders}
          
          </ul>
        </div>
    );
  }
  
}

function CardsColumn(props) {
  
  
  return (
    <div className='column smallerc'>
      <ul className='columnlistcontainer'>
        
        { (props.cards || []).map(card => (
            <CardListItem key={card.id} card={card} onClickCardPerson={props.onClickCardPerson} onClickCard={props.onClickCard} onClickCardListItem={props.onClickCardListItem} />
          ))
        }
        
        <li key="newcard" onClick={props.onClickNewCard} className='pillbox pluscardpill'>
          <h1>+</h1>
        </li>
      </ul>
    </div>
  );
}

class Rectangle extends React.Component {
  
  
  onClickEmailCardItem(cardTitle,emailId){
    console.log("onClickEmailCardItem(cardTitle,emailId){")
    console.log(cardTitle);
    console.log("and");
    console.log(emailId);
  }
  onClickEmailSender(emailId, subject){
    console.log("onClickEmailSender")
    console.log(subject);
  }
  
  onClickEmailAddToCard(emailId){
    
    console.log("onClickEmailAddToCard(emailId){")
    console.log(emailId);
  }
  
  
  onClickCardPerson(cardId,personId){
    console.log("onClickCardPerson(cardId,personId){");
    console.log(cardId);
    console.log("and card person id");
    console.log(personId);
    
  }
  
  onClickNewCard(){
    
    console.log("onClickNewCard");
    
  }
  
  onClickCardListItem(cardTitle, typeOfListItem, listItemId) {
    
    console.log("onClickCardListItem title type listitemid");
    console.log(cardTitle)
    
    console.log(typeOfListItem)
    
    console.log(listItemId)
    
  }
  
  onClickCard(cardTitle){
    
    console.log("test onclick card")
    
    console.log(cardTitle)
  }
  
  fetch_email_by_id(id) {
    
    for (let i = 0; i < this.state.emails.length; i++) { 
      if (this.state.emails[i].id === id){
        
        return this.state.emails[i]
      }
      
    }
    return null
  }
  
  fetch_person_by_id(id) {
    
    for (let i = 0; i < this.state.shown_people.length; i++) { 
      if (this.state.shown_people[i].id === id){
        
        return this.state.shown_people[i]
      }
      
    }
    return null
  }
  
  process_cards(_cards) {
    var processed_cards = [] // with presentation strings
    
    for (let i = 0; i < this.state.cards.length; i++) { 
    
      var _card = this.state.cards[i]
      
      _card.shortTitle = ""
      
      
      _card.pres_stakeholders = []
      
      for (let _i = 0; _i < _card.stakeholders.length; _i++) { 
        
        var _person = this.fetch_person_by_id(_card.stakeholders[_i])
        
        
        var _pres_stakeholder = Object.assign({}, _person);
        
        _card.pres_stakeholders.push(_pres_stakeholder);
      }
      
      processed_cards.push(_card)
    }
  
    return processed_cards;
  }
  
  render() {
    
    var processed_cards = this.process_cards(this.state.cards)
    
    console.log("this.props")
    
    console.log(this.props)
    
    return (
      <div className="App">
        
        <UIbar />
        
        <div className='row'>
          
          <EmailsColumn emails={this.state.emails} shown_people={this.state.shown_people} onClickEmailCardItem={this.onClickEmailCardItem} onClickEmailSender={this.onClickEmailSender} onClickEmailAddToCard={this.onClickEmailAddToCard} />
          
          <CardsColumn cards={processed_cards} onClickCardPerson={this.onClickCardPerson} onClickNewCard={this.onClickNewCard} onClickCard={this.onClickCard} onClickCardListItem={this.onClickCardListItem} />
          
        </div>
        
      </div>
    );
  }
  
  constructor(props) {
    
    console.log("wassup")
    super(props);
    
    // console.log(props.props);
    // console.log(Object.keys(props.props))
    // console.log(JSON.stringify(props.props))
    
    var initialDummyFixture = {
      user_title: "Spencer Dailey",
      timezone: "America/Los_Angeles",
      
      shown_people:[
      
        {
          address:"don@bon.com",
          name:"Don Rickles",
          first_or_nickname:"Don",
          id:123
        },{
          address:"marcus@bon.com",
          name:"Marcus Jenkins",
          first_or_nickname:"Marcus",
          id:1234
        },{
          id:528,
          address:"mom@hotmail.com",
          first_or_nickname:"Mom",
          name:"Mom"
        },{
          id:238,
          address:"dad@yahoo.com",
          first_or_nickname:"Dad",
          name:"Dad"
        },{
          id:5623,
          address:"*@orbitz.com",
          first_or_nickname:"Orbitz",
          name:"Orbitz"
          
          
        }
      
      
      ],
      
      emails:[{
        // open?
        
        shown:true,
        
        id:123,
        
        sender_id:123,
        sender_doc:null,
        
        subject:"Did you see the pull request?",
        bodyPreview:"",
        cardnames: ["Coding project"]
        
      },{
        
        shown:true,
        
        id:468,
        
        sender_id:null,
        sender_doc:{
          address:"tc@techcrunch.com",
          name:"Techcrunch",
          id: null
        },
        
        subject:"Daily newsletter",
        bodyPreview:"",
        
        cardnames:[  ],
        
        pres_cards: ["Coding project"]
        
      }],
      
      
      
      
      cards:[{
        id:123,
        title:"Coding project",
        
        pres_pinnedEmails:[
          {id:865,subject:"Did you see the pull request?"},
          
        
        ],
        
        pinnedFiles:[{
          id:123,
          title:"1.0 Draft Specification",
          pres_title:"1.0 Draft Specification"
          
        }],
        
        pinnedCalendarAppointments:[],
        
        
        stakeholders:[123,1234]
        
      },{
        id:1234,
        title:"Trip to Philly",
        
        
        // pinnedEmails:[132],
        pres_pinnedEmails:[
          {id:865, subject:"Flight itinerary Orbitz"},
          {id:132,subject:"Opentable dinner reservations"}
        ],
        
        pinnedFiles:[],
        
        pinnedCalendarAppointments:[{
          
          id:123,
          title:"Barnes Museum tour"
          
        }],
        
        stakeholders:[528,238,5623]
        
      }],
      
      boxShowing:"inbox",
      
      whatIsHighlighted:[]

    };
    
    
    // **** READ BELOW **** //
    
    // ALL OF THIS IS SUPER HACK-Y AND IS HERE JUST FOR DEMO PURPOSES TO LOAD IN EMAILS //
    
    // **** READ ABOVE **** //
    
    this.state = initialDummyFixture
    
    var realEmails = []
    
    var id = 5555;
    if (props.messages != undefined) {
      console.log("well well then")
      
      var alreadyPulledEmails = false
      
      for (let i = 0; i < this.state.emails.length; i++) { 
        if (this.state.emails[i].id == 5556) {
          
          alreadyPulledEmails = true
        }
        
      }
      if (alreadyPulledEmails == false) {
        
        for (let i = 0; i < props.messages.length; i++) { 
          var newEmail = {};
          newEmail.id = id + 1;
          id++;
          
          newEmail.shown = true;
          
          // checkForKnownIds()
          newEmail.sender_id = null;
          
          newEmail.sender_doc = {
            "address": props.messages[i].sender.emailAddress.address,
            "name": props.messages[i].sender.emailAddress.name
          }
          newEmail.subject = props.messages[i].subject;
          newEmail.cardnames = [];
          
          newEmail.bodyPreview = props.messages[i].bodyPreview;
          console.log("i'm trying")
          realEmails.push(newEmail);
        }
        
      }
      
      
      var newEmails = this.state.emails.concat(realEmails)
      
      this.setState({ emails : newEmails })
    } else {
      
      console.log("never tried2")
      console.log(props.messages)
      console.log(props.messages == undefined)
      console.log(props.messages)
    }
    
  }
  
  
  // **** READ BELOW **** //
    
  // ALL OF THIS IS SUPER HACK-Y AND IS HERE JUST FOR DEMO PURPOSES TO LOAD IN EMAILS //
  
  // **** READ ABOVE **** //
  componentWillReceiveProps(nextProps) {
    
    var _this = this;
    
      var realEmails = []
    
      var id = 5555;
      if (nextProps.messages != undefined) {
        
        var alreadyPulledEmails = false;
        if (this.state.emails != undefined) {
          
          for (let i = 0; i < this.state.emails.length; i++) { 
            if (this.state.emails[i].id == 5556) {
              
              alreadyPulledEmails = true
            }
            
          }
        }
        if (alreadyPulledEmails == false) {
        
          for (let i = 0; i < nextProps.messages.length; i++) { 
            var newEmail = {};
            newEmail.id = id + 1;
            id++;
            
            newEmail.shown = true;
            
            // checkForKnownIds()
            newEmail.sender_id = null;
            
            newEmail.sender_doc = {
              "address": nextProps.messages[i].sender.emailAddress.address,
              "name": nextProps.messages[i].sender.emailAddress.name
            }
            newEmail.subject = nextProps.messages[i].subject;
            newEmail.cardnames = [];
            
            newEmail.bodyPreview = nextProps.messages[i].bodyPreview;
            console.log("i'm trying")
            realEmails.push(newEmail);
          }
          
          var newEmails = _this.state.emails.concat(realEmails)
        
          _this.setState({ emails : newEmails })
          
        }
        // this.forceUpdate()
        console.log("come on!")
      } else {
        
        console.log("never tried")
        console.log(nextProps.messages)
        console.log(nextProps.messages == undefined)
        console.log(nextProps.messages)
      }
      console.log("console.log(initialDummyFixture)")
      // console.log(initialDummyFixture)
    
    
  }
}

function shortenStringIfLongWithEllipsis(_string,maxlength) {
  
  var shortenedString = _string;
  if (shortenedString.length > maxlength) {
    shortenedString = shortenedString.substring(0, maxlength - 4) + "...";
  }
  return shortenedString;
}
