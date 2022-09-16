const axios = require('axios');
const input=require('readline-sync');
const url=  'http://localhost:3000/posts'

console.log('\nPress 1. For Create\nPress 2. For Read\nPress 3. For Update\nPress 4. For Delete\nPress 5. For Breack\n');
const cheak_id=()=>{
    const number=input.questionInt('Please enter your User-id => ');
    if(Number.isSafeInteger(number)){
        return number;
    }else{
        console.log('\nYour id is not right\nPlease enter your right id\n');
        return cheak_id();
    };
};
const Mo_Number=()=>{
    const M_Number=input.question('Please enter your Mobile Number => ');
    if(M_Number.length == '10'){
        return M_Number;
    }else{
        console.log('\nYour mobile number lenght is not Right\nPlease enter your right Mobile Number\n');
        return Mo_Number();
    };
};
const Check_Email=()=>{
    const Email=input.question('Please enter your E-mail ID => ');
    if( Email.includes('@') && Email.includes('gmail.com')){
        return Email;
    }else{
        console.log('\nYour Email Id is not right\nPlease enter your right Email ID\n');
        return Check_Email();
    };
};
const Check_Password = () =>{
    const array=['@','#','$','&','*','?','/','^',1,2,3,4,5,6,7,8,9,0];
    const Password=input.question('Please enter your Eight Digit Password => ');
    for(arr of array){
        if( Password.length == '8' && Password.includes(arr)){
            console.log('Your Password is right ');
            return Password
        }else{
            console.log('\nYour Password is not right\nPlease enter yourn right Password\n');
            return Check_Password();
        }
    }
}
const created = async () =>{
    try {
        const data={
            'id':cheak_id(),
            'UserName':input.question('Please enter your Full Name => '),
            'Age':input.questionInt('Please enter your Age => '),
            'MobileNumber':Mo_Number(),
            'Email':Check_Email(),
            'Password':Check_Password()
        }
        const a=await axios.post(url,data);
        console.log('Your data created successfully.......',"👍")

    }catch (error) {
        console.log('Sorry Your User-ID allready have ;');
        console.log(error);
        
    }
}
const read= async () =>{
    try {
         const id=cheak_id();
        const info = await axios.get(url+'/'+id);
        console.log(info.data);
    } catch (error) {
        console.log(error.message);
    }
}
const Update=async ()=>{
    try {
        const id = cheak_id();
        const Info = await axios.get(url+'/'+id)
        const userData = Info.data;
        console.log(userData);
        console.log('\nPress 1. For Update User-Name.\nPress 2. For Update Age.\nPress 3. For Update Mobile Number.\nPress 4. For Update Email-ID.\nPress 5. For Update Password.\nPress 6. For all Updated.\nPress 7. For Stoped Program.\n');
        const Choice = input.questionInt('Please enter your Choice => ');
        if( Choice === 1 ){
            const UserName = input.question('Please enter your new User-Name => ');
            await axios.patch(url+'/'+id,{"UserName":UserName})
            console.log('Your UserName Updated successfully.......',"👍")
        }
        else if( Choice === 2 ){
        const Age = input.questionInt('Please enter your new Age => ');
        await axios.patch(url+'/'+id,{'Age':Age});
        console.log('Your Age Updated successfully.......',"👍")
        }
        else if( Choice === 3 ){
            const MobileNumber = Mo_Number();
            await axios.patch(url+'/'+id,{'MobileNumber':MobileNumber});
            console.log('Your Mobile-Number Updated successfully.......',"👍")
        }
        else if( Choice === 4 ){
            const E_Mail=Check_Email();
            await axios.patch(url+'/'+id,{'Email':E_Mail});
            console.log('Your E-mail Id Updated successfully.......',"👍")
        }
        else if( Choice === 5 ){
            const Pass = Check_Password();
            await axios.patch(url+'/'+id,{ 'Password':Pass });
            console.log('Your Password Updated successfully.......',"👍")
        }
        else if( Choice === 6 ){
            const data={
                'UserName':input.question('Please enter your Full Name => '),
                'Age':input.questionInt('Please enter your Age => '),
                'MobileNumber':Mo_Number(),
                'Email':Check_Email(),
                'Password':Check_Password()
            }
            await axios.patch(url+'/'+id,data);
            console.log('Your all data Updated  successfully.......',"👍");
        }
        else if( Choice === 7 ){
            console.log('Your program stoped ;');
            process.exit();
        }
    }catch (error) {
        console.log(error.message);
    }
}
const delete1 = async () =>{
    try {
        const id=cheak_id();
        await axios.delete(url+'/'+id);
        console.log('Your ID data deleted ;');      
    } catch (error) {
        console.log(error.message);
    }
}
const choice = input.questionInt('Please Enter You Choice => ');
if( choice === 1 ){
    created();
}else if( choice === 2 ){
    // const id=cheak_id();
    read();
}else if( choice === 3 ){
    Update();
}else if( choice === 4 ){
    delete1();
}else if( choice === 5 ){
    console.log('Program Stoped ;');
    process.exit();
}