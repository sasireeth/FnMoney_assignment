import React, { Component } from 'react';
import axios from 'axios';

class AssessmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      error: '',
      success: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description } = this.state;

    if (!title || !description) {
      this.setState({ error: 'Please fill in all fields', success: '' });
      return;
    }
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post('http://localhost:9000/api/assessments', 
            { title, description },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
      this.setState({ title: '', description: '', error: '', success: 'Assessment created!' });
      console.log('Assessment created:', response.data);
    } catch (error) {
      this.setState({ error: error.response.data.msg || 'Failed to create assessment. Please try again.', success: '' });
      console.error('Assessment error:', error);
    }
  }

  render() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">Create Assessment</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Title</span>
              <input 
                type="text" 
                name="title" 
                value={this.state.title} 
                onChange={this.handleChange} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Assessment Title" 
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Description</span>
              <textarea 
                name="description" 
                value={this.state.description} 
                onChange={this.handleChange} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Assessment Description" 
              />
            </label>
            {this.state.error && <p className="text-red-600 mb-4">{this.state.error}</p>}
            {this.state.success && <p className="text-green-600 mb-4">{this.state.success}</p>}
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 w-full">Create Assessment</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AssessmentForm;
