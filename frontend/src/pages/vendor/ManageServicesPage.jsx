import { useState } from 'react'

export default function ManageServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Haircut",
      duration: 30,
      price: 30,
      description: "Basic haircut service"
    },
    {
      id: 2,
      name: "Hair Styling",
      duration: 60,
      price: 50,
      description: "Professional hair styling"
    }
  ])

  const [newService, setNewService] = useState({
    name: '',
    duration: '',
    price: '',
    description: ''
  })

  const [editingService, setEditingService] = useState(null)

  const handleAddService = (e) => {
    e.preventDefault()
    const newServiceId = services.length + 1
    setServices([...services, { id: newServiceId, ...newService }])
    alert('Service added successfully!')
    setNewService({ name: '', duration: '', price: '', description: '' })
  }

  const handleEditService = (serviceId) => {
    const serviceToEdit = services.find(service => service.id === serviceId)
    setEditingService(serviceToEdit)
  }

  const handleUpdateService = (e) => {
    e.preventDefault()
    setServices(services.map(service => service.id === editingService.id ? editingService : service))
    alert('Service updated successfully!')
    setEditingService(null)
  }

  const handleDeleteService = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId))
    alert('Service deleted successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Manage Services</h1>

      {/* Add or Edit Service Form */}
      <div className="bg-white rounded-lg shadow mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={editingService ? handleUpdateService : handleAddService} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Service Name</label>
              <input
                type="text"
                value={editingService ? editingService.name : newService.name}
                onChange={(e) => editingService ? setEditingService({ ...editingService, name: e.target.value }) : setNewService({ ...newService, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={editingService ? editingService.duration : newService.duration}
                onChange={(e) => editingService ? setEditingService({ ...editingService, duration: e.target.value }) : setNewService({ ...newService, duration: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                value={editingService ? editingService.price : newService.price}
                onChange={(e) => editingService ? setEditingService({ ...editingService, price: e.target.value }) : setNewService({ ...newService, price: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={editingService ? editingService.description : newService.description}
                onChange={(e) => editingService ? setEditingService({ ...editingService, description: e.target.value }) : setNewService({ ...newService, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {editingService ? 'Update Service' : 'Add Service'}
          </button>
          {editingService && (
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <div className="flex space-x-4 mt-1 text-sm text-gray-500">
                  <span>{service.duration} minutes</span>
                  <span>${service.price}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditService(service.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 