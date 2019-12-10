const remoteURL = "http://localhost:5002";

export default {
  async get(route) {
    const results = await fetch(`${remoteURL}/${route}`);
    return results.json();
  },
  async delete(route) {
    const results = await fetch(`${remoteURL}/${route}`, {
      method: "DELETE"
    });
    return results.json();
  },
  async post(route, newItem) {
    const results = await fetch(`${remoteURL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    });
    return results.json();
  },
  async update(route, editedItem) {
    const results = await fetch(`${remoteURL}/${route}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    });
    return results.json();
  },
  async patch(route, editedItem) {
    const results = await fetch(`${remoteURL}/${route}/${editedItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    });
    return results.json();
  }
};
