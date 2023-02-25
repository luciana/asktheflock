/* eslint-disable no-useless-escape */
//https://www.geeksforgeeks.org/how-to-count-number-of-occurrences-of-repeated-names-in-an-array-of-objects-in-javascript/
const findCounts = (arr,key, field) => {   
    let arr2 = [];

  //   [
  //     {
  //         "userID": "2abece6f-effe-47b3-9bf6-9e310ca612f2",
  //         "userName": "Rodolpho Vendramini",
  //         "value": 7
  //     },
  //     {
  //         "userID": "ebda0a01-2bc4-4bcd-868b-c17f5e5f0990",
  //         "userName": "Luciana Ys",
  //         "value": 6
  //     },
  //     {
  //         "userID": "5ff35d90-35dc-4d75-8eb3-89d28f57891b",
  //         "userName": "Luciana ALOP",
  //         "value": 3
  //     },
  //     {
  //         "userID": "5ff35d90-35dc-4d75-8eb3-89d28f57891b",
  //         "userName": "Luciana ALOP",
  //         "value": 2
  //     },
  //     {
  //         "userID": "708be646-3cd4-459f-8e94-3d47b37ea743",
  //         "userName": "Aninha",
  //         "value": 1
  //     }
  // ]

      
    arr.forEach((x)=>{
         
      // Checking if there is any object in arr2
      // which contains the key value
       if(arr2.some((val)=>{ return val[key] === x[key] })){
          // x is items in arr console.log(x);
         // If yes! then increase the occurrence by 1
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
            if(x["value"]){
              k["value"] = x["value"] +  k["value"] + 1;
            }else{
              k["value"]++;
            }            
             k[field] = x[field];
           }
           
        })
           
       }else{
         // If not! Then create a new object initialize 
         // it with the present iteration key's value and 
         // set the value to 1
         let a = {}
         a[key] = x[key]
         a[field] = x[field];
         if(x["value"]){
          a["value"] = x["value"];
         }else{
          a["value"] = 1;
         }
         arr2.push(a);
       }
    })
    return arr2;
  };
  
  export default findCounts;