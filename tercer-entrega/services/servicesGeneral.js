const getEmail = async (req) =>{
  return {email: req.session.user }
}

export default {
  getEmail,
}
