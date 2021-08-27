
export async function getemails(graphClient) {
  let response2 = await graphClient
      .api('/me/messages')
      
      // Select just the fields we are interested in
      .select('sender,subject,bodyPreview')
      
      // Maximum 50 events in response
      .top(10)
      .get();
      
    console.log("test2");
    console.log(response2)
    
    return response2.value
    
    
}