
import Avatar from 'react-avatar';

export default function CommentStats({optionId, commentDataForQuestion}) {


    const data = commentDataForQuestion && (commentDataForQuestion).filter((i) => i.optionID === optionId);


  return (
    <>     
    {data && (
         <>     
           {data.map((val, index) => (
    
           <div  key={index}>
           <div className="p-2 d-flex flex-row">   
           <div><Avatar size="42" 
               name={JSON.parse(val.comment).userName}
               className="rounded-circle mx-auto my-auto" alt={JSON.parse(val.comment).userName} />  
           </div>  
           <div className="mx-2"> 
           <p> 
           {JSON.parse(val.comment).comment}
           </p>
           <p className="text-color-gray text-sm">{JSON.parse(val.comment).userTag ? JSON.parse(val.comment).userTag : "" }</p>
           </div>  

           </div>
           <hr />
       </div>
           ))}
         </>
    )}                                                  
    </>

  );
}