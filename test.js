// const getAllPost = async (req, res, next) => {
//   try {
//     const posts = await Post.find({});
//     res.status(200).render('board', { posts });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  }); 
  
  
  const axios = require('axios')
  axios({
    method : 'get',
    url : 'https://www.naver.com/'
  }).then((res)=>{
    console.log(res)
  })
  
  const axios = require('axios')
  axios.post('http://localhost:3000/axios',{
      name : 'balmostory'
  }).then((res)=>{
    console.log(res)
  })
  
  function onLoggin(){
            
    const email = document.getElementById("email");
    const password = document.getElementById('pw')
    axios({
        method:"POST",
        url: 'https://reqres.in/api/login',
        data:{
            "email": email.value,
            "password": password.value
        }
    }).then((res)=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });
}

