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


async function getData() {
  try {
    //응답 성공
    const response = await axios.get('url주소');
    console.log(response);
  } catch (error) {
    //응답 실패
    console.error(error);
  }
}

function submit_click(){
  var email = $("#email").val();
  var password = $("#password").val();
  var name = $("#name").val();
  var nickname = $("#nickname").val();
  var rrn = $("#rrn").val();
  var gender = $("#gender").val();
  var phone = $("#phone").val();

  axios.request({
      method : 'POST',
      url: '/member/new',
      headers: {'Content-type' : 'application/json'},
      data: {
          email : email,
          password : password,
          name : name,
          nickname : nickname,
          rrn : rrn,
          gender : gender,
          phone : phone
      }
  }).then(
      alert("성공했습니다.")
  )
}