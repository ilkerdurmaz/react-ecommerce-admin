export const calculateRating = (ratings)=>{
    const temp=Object.values(ratings)
    let sum1=0
    let sum2=0
    for(let i=0;i<temp.length;i++){
        sum1+=temp[i]*(i+1)
        sum2+=temp[i]
    }
    return Number((sum1/sum2).toFixed(1))||0
}