export const checkValidaData = (email,password)=>{

  const isEmailvalid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
  const isPassvalid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);

  if(!isEmailvalid) return "Email id is not valid";
  if(!isPassvalid) return "Password is not valid";

  return null;

}