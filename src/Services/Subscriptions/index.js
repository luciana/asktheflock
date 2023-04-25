import {API, graphqlOperation } from 'aws-amplify';
import { onCreateQuestion, onUpdateQuestion, onDeleteQuestion, onCreateVote, onUpdateVote, onDeleteVote } from '../../graphql/subscriptions';
import { TYPES } from "../../Constants";

export const subscribeToQuestion = (dispatch) => {

    API.graphql(
        graphqlOperation(onCreateQuestion)
      ).subscribe({
        next: (payload) => {
          const createdQuestionInput = payload.value.data?.onCreateQuestion;
          console.log(`new data from create sub: ${JSON.stringify(createdQuestionInput)}`);                              
          dispatch({type: TYPES.ADD_QUESTION, payload: createdQuestionInput});
        }
      });

      API.graphql(
        graphqlOperation(onUpdateQuestion),
      ).subscribe({
        next: (payload) =>{ 
          console.log(`new data from update sub: ${JSON.stringify( payload.value.data?.onUpdateQuestion)}`);  
          dispatch({type: TYPES.UPDATE_QUESTION, payload: payload.value.data?.onUpdateQuestion});
        }
      });

      API.graphql(
        graphqlOperation(onDeleteQuestion),
      ).subscribe({
        next: (payload) =>{ 
          console.log(`new data from update sub: ${JSON.stringify( payload.value.data?.onDeleteQuestion)}`);  
          dispatch({type: TYPES.DELETE_QUESTION, payload: payload.value.data?.onDeleteQuestion});
        }
      });

      return () => {
        //cleanup
        onCreateQuestion.unsubscribe();
        onUpdateQuestion.unsubscribe()
        onDeleteQuestion.unsubscribe()
      }
    }

    export const subscribeToVote = () => {
        API.graphql(
            graphqlOperation(onCreateVote)
          ).subscribe({
            next: (payload) => {
              const createdVoteInput = payload.value.data?.onCreateVote;
              console.log(`new data from vote sub: ${JSON.stringify(createdVoteInput)}`);                                          
            }
          });
    
          // API.graphql(
          //   graphqlOperation(onUpdateVote),
          // ).subscribe({
          //   next: (payload) => dispatch(payload.value.data.onUpdateVote),
          // });
    
          // API.graphql(
          //   graphqlOperation(onDeleteVote),
          // ).subscribe({
          //   next: (payload) => dispatch(payload.value.data.onDeleteVote),
          // });
    
    
          return () => {
            //cleanup
            onCreateVote.unsubscribe();
            onUpdateVote.unsubscribe()
            onDeleteVote.unsubscribe()
          }
        }