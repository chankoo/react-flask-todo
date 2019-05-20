const handleResponse = response => {
    // console.log('from handleResponse',typeof(response), response)
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
        return Promise.reject(response)
        }
        const error = (data && data.message) || response.statusText
        return Promise.reject(error)
        }
    return data
    })
}

const createFormReset = (_this) =>{
  _this.setState({
    mode:'read',
    input_title:'',
    input_content:'',
    deadLineCheck: false,
    input_deadLine: null
  })
}

const updateFormReset = (_this) =>{
  _this.setState({
    mode:'read',
    put_title:'',
    put_content:'',
    put_deadLineCheck: false,
    put_deadLine: null
  })
}

const getNowStrDate = () =>{
  const now = new Date()
  let month = (now.getMonth()+1)
  let date = now.getDate()
  month = (month < 10 ? '0'+month : month.toString())
  date = (date < 10 ? '0'+date : date.toString())

  return (now.getFullYear()+ '-' + month +'-' + date)
}

export {handleResponse, createFormReset, updateFormReset, getNowStrDate}