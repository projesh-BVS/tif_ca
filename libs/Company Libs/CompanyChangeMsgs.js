const msg_Company_Update_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Company information updated successfully!",
  ButtonText: "Close",
};

const msg_Company_Update_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to update company information! Please try again",
  ButtonText: "Close",
};

const msg_Company_Delete_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Company deleted successfully",
  ButtonText: "Close",
};

const msg_Company_Delete_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to delete company! Please try again",
  ButtonText: "Close",
};

export function GetCompanyChangeMsg_Update(isSuccess) {
  return isSuccess ? msg_Company_Update_Success : msg_Company_Update_Failure;
}

export function GetCompanyChangeMsg_Delete(isSuccess) {
  return isSuccess ? msg_Company_Delete_Success : msg_Company_Delete_Failure;
}
