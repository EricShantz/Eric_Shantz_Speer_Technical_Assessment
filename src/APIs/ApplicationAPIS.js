// const corsAnywhereUrl = "https://charming-bat-singlet.cyclic.app";
// const base_url = `${corsAnywhereUrl}/${"https://cerulean-marlin-wig.cyclic.app"}`;
const base_url = `${"https://cerulean-marlin-wig.cyclic.app"}`;

export function GetCallHistory() {
  return fetch(`${base_url}/activities`).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
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
}

export function ArchiveAll(allCalls) {
  let itemsToUpdate = allCalls.filter((item) => !item.is_archived);

  const archivePromises = itemsToUpdate.map((item) => ArchiveOne(item));

  return Promise.all(archivePromises)
    .then((results) => {
      console.log('All items archived successfully', results);
    })
    .catch((error) => {
      console.error("Error archiving all calls")
     
    })
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
// * fuix archive all toasts
// * add loaders
// * add "No calls to display" if list is empty
// * fix animations
