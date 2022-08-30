const getEmail = async (req) =>{
  return {email: req.session.email }
}

export default {
  getEmail,
}
