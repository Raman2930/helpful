import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ThumbsUp, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react';

const devices = [
  { id: 1, brand: 'Samsung', models: ['Galaxy S21 FE', 'Galaxy S22', 'Galaxy A52'] },
  { id: 2, brand: 'Apple', models: ['iPhone 12', 'iPhone 13', 'iPhone SE'] },
  // Add more devices as needed
];

const samsungS21FEFeatures = [
  { id: 1, name: 'Pro-grade Camera', description: 'Capture stunning photos with the 32MP front camera and triple rear camera setup.', helpful: 450 },
  { id: 2, name: '120Hz Display', description: 'Enjoy smooth scrolling and responsive touch with the 120Hz refresh rate display.', helpful: 380 },
  { id: 3, name: '5G Connectivity', description: 'Experience ultra-fast download and streaming speeds with 5G capability.', helpful: 320 },
  { id: 4, name: 'All-day Intelligent Battery', description: 'The 4,500mAh battery adapts to your usage for longer life.', helpful: 410 },
  { id: 5, name: 'Samsung DeX', description: 'Transform your phone into a PC-like experience when connected to a monitor.', helpful: 280 },
];

const DeviceFeatureDiscoveryTool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [userSuggestion, setUserSuggestion] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedDevice(null);
  };

  const handleDeviceSelect = (brand, model) => {
    setSelectedDevice({ brand, model });
    setSearchTerm('');
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSuggestionSubmit = () => {
    // Here you would typically send the suggestion to a backend
    console.log("User suggestion:", userSuggestion);
    setUserSuggestion('');
    setShowSuggestionBox(false);
  };

  const filteredDevices = devices.flatMap(device => 
    device.models
      .filter(model => model.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(model => ({ brand: device.brand, model }))
  );

  const renderDeviceInfo = () => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{selectedDevice.brand} {selectedDevice.model}</h2>
      
      {['Features', 'Articles', 'User Insights'].map((section) => (
        <Card key={section} className="mb-4">
          <CardHeader className="cursor-pointer" onClick={() => toggleSection(section)}>
            <CardTitle className="flex justify-between items-center">
              {section}
              {expandedSections[section] ? <ChevronDown /> : <ChevronRight />}
            </CardTitle>
          </CardHeader>
          {expandedSections[section] && (
            <CardContent>
              {section === 'Features' && selectedDevice.model === 'Galaxy S21 FE' && (
                <div>
                  {samsungS21FEFeatures.map((feature) => (
                    <Card key={feature.id} className="mb-4">
                      <CardHeader>
                        <CardTitle className="group cursor-pointer">
                          <span className="transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-500 to-pink-500 bg-growing-underline">
                            {feature.name}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{feature.description}</p>
                        <div className="flex items-center mt-2">
                          <ThumbsUp className="w-5 h-5 mr-1" />
                          <span>{feature.helpful} found this helpful</span>
                          <MessageSquare className="w-5 h-5 ml-4 mr-1" />
                          <span>Comment</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {section === 'Articles' && (
                <ul className="list-disc pl-5">
                  <li>Top 10 hidden features of {selectedDevice.model}</li>
                  <li>How to optimize battery life on your {selectedDevice.model}</li>
                  <li>Best camera settings for {selectedDevice.model}</li>
                </ul>
              )}
              {section === 'User Insights' && (
                <p>Users find the {selectedDevice.model}'s camera features particularly valuable for night photography and video stabilization.</p>
              )}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-white">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Discover Your Device's Power
      </h1>
      <h2 className="text-2xl mb-8 text-center">
        Make the Most of It
      </h2>
      
      <div className="w-full max-w-2xl">
        <Input
          type="text"
          placeholder="Search for your device..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-4"
        />
        
        {searchTerm && !selectedDevice && (
          <Card className="mb-4">
            <CardContent className="p-0">
              {filteredDevices.map((device, index) => (
                <div 
                  key={index} 
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleDeviceSelect(device.brand, device.model)}
                >
                  {device.brand} {device.model}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        {selectedDevice && renderDeviceInfo()}
      </div>
      
      <div 
        className="fixed bottom-8 right-8 bg-red-500 rounded-full p-4 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={() => setShowSuggestionBox(true)}
      >
        <span className="text-white font-bold">Suggest a Feature</span>
      </div>
      
      {showSuggestionBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Suggest a Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Enter your suggestion..."
                value={userSuggestion}
                onChange={(e) => setUserSuggestion(e.target.value)}
                className="mb-4"
              />
              <div className="flex justify-end">
                <Button onClick={handleSuggestionSubmit} className="mr-2">Submit</Button>
                <Button onClick={() => setShowSuggestionBox(false)} variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DeviceFeatureDiscoveryTool;