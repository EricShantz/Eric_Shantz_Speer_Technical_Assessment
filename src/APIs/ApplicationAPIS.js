// const corsAnywhereUrl = "https://charming-bat-singlet.cyclic.app";
// const base_url = `${corsAnywhereUrl}/https://cerulean-marlin-wig.cyclic.app`;
const base_url = `https://cerulean-marlin-wig.cyclic.app`;

export function GetCallHistory() {
  try{

    return fetch(`${base_url}/activities`).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }catch(err){
    console.warn("Error GetCallHistory", err)
  }
}

export function ArchiveOne(callDetails) {
  let updatedCallBody = Object.assign({}, callDetails, { is_archived: true});


    return fetch(`${base_url}/activities/${callDetails.id}`,   
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCallBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.text(); 
    })
  }
  
export function RestoreOne(callDetails) {

  let updatedCallBody = Object.assign({}, callDetails, { is_archived: false });

  try{

    return fetch(`${base_url}/activities/${callDetails.id}`,   
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCallBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unable to restore record');
      }
      return response.text(); 
    })
  }catch(err){
    console.warn("Error RestoreOne", err)
  }
}
  
  export function ArchiveAll(allCalls) {
    const itemsToUpdate = allCalls.filter((item) => !item.is_archived);
    
    const archivePromises = itemsToUpdate.map((item) => {
      const updatedCallBody = {
        id: item.id,
        is_archived: true,
      };
  
  
        return fetch(`${base_url}/activities/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedCallBody)
        })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((errorResponse) => {
              throw new Error(`Error archiving call with ID ${item.id}: ${errorResponse}`);
            });
          }
          return response.text();
        })
        .catch((err) => {
          throw new Error(`Error archiving call`, err);
        });      
    });
  
  return Promise.all(archivePromises)
    .then((results) => {
      console.log('All items archived successfully', results);
      return results
    })
    .catch((error) => {
      console.log("Error archiving all calls", error)
      throw new Error("Error archiving all calls", error);
    });
}

export function RestoreAll(allCalls) {
  let itemsToUpdate = allCalls.filter((item) => item.is_archived);
  const archivePromises = itemsToUpdate.map((item) => RestoreOne(item));
  return Promise.all(archivePromises)
    .then((results) => {
      
      console.log('All items Restored successfully', results);
    })
    .catch((error) => {
      console.error('Error archiving items', error);
      throw error; 
    });
}


//TODO:
// * add "No calls to display" if list is empty
// * fix animations
