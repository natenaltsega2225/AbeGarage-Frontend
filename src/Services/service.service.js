const api_url = import.meta.env.VITE_API_URL;

const addService = async (formData, loggedInEmployeeToken) => {
  const response = await fetch(`${api_url}/api/service`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  });
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(`Unexpected response: ${errorText}`);
  }
};

const getAllServices = async (loggedInEmployeeToken) => {
  const response = await fetch(`${api_url}/api/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  });
  return response.json();
};

const updateService = async (serviceId, formData, loggedInEmployeeToken) => {
  const response = await fetch(`${api_url}/api/service/${serviceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  });
  // check if response is JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(`Unexpexted response format: ${errorText}`);
  }
};

const singleService = async (id, loggedInEmployeeToken) => {
  const response = await fetch(`${api_url}/api/service/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  });
  return response.json();
};

const deleteService = async (serviceId, loggedInEmployeeToken) => {
  const response = await fetch(`${api_url}/api/delete-service/${serviceId}`, {
    method: "DELETE",
    headers: {
      "x-access-token": loggedInEmployeeToken,
    },
  });

  // Check if response is JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(`Unexpected response: ${errorText}`);
  }
};

export default {
  addService,
  getAllServices,
  updateService,
  singleService,
  deleteService,
};
