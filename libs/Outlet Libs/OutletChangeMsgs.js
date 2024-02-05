const msg_Outlet_Upload_Success = {
  Type: "Success",
  Title: "Success",
  Description: "New outlet added successfully!",
  ButtonText: "Close",
};

const msg_Outlet_Upload_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to add new outlet! Please try again",
  ButtonText: "Close",
};

const msg_Outlet_Update_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Outlet information updated successfully!",
  ButtonText: "Close",
};

const msg_Outlet_Update_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to update outlet information! Please try again",
  ButtonText: "Close",
};

const prompt_Outlet_Delete = {
  Title: "Confirm Delete",
  Description: "Are you sure you want to delete this outlet?",
  ButtonText_Yes: "Yes",
  ButtonText_No: "No",
};

const msg_Outlet_Delete_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Outlet deleted successfully!",
  ButtonText: "Close",
};

const msg_Outlet_Delete_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to delete outlet! Please try again",
  ButtonText: "Close",
};

export function GetOutletChangeMsg_Upload(isSuccess) {
  return isSuccess ? msg_Outlet_Upload_Success : msg_Outlet_Upload_Failure;
}

export function GetOutletChangeMsg_Update(isSuccess) {
  return isSuccess ? msg_Outlet_Update_Success : msg_Outlet_Update_Failure;
}

export function GetOutletChangeMsg_Delete(isSuccess) {
  return isSuccess ? msg_Outlet_Delete_Success : msg_Outlet_Delete_Failure;
}

export function GetOutletChangePrompt_Delete() {
  return prompt_Outlet_Delete;
}
