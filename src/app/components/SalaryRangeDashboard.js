'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card.js';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertCircle } from 'lucide-react';

export default function SalaryDashboard() {
  const [activeTab, setActiveTab] = useState('web-team-lead');
  
  const salaryData = {
    'web-team-lead': [
      {
        city: 'Charlotte, NC (Primary)',
        min: 98000,
        median: 115000,
        max: 130000
      },
      {
        city: 'Greenville, SC (Primary)',
        min: 90000,
        median: 105000,
        max: 120000
      }
    ],
    'web-development-manager': [
      {
        city: 'Charlotte, NC (Primary)',
        min: 120000,
        median: 135000,
        max: 150000
      },
      {
        city: 'Greenville, SC (Primary)',
        min: 110000,
        median: 125000,
        max: 140000
      }
    ]
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Salary Range Analysis
            <span className="text-sm font-normal text-blue-600 flex items-center gap-1">
              <AlertCircle size={16} />
              Company Location & Skills Analysis
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="web-team-lead">Web Team Lead</TabsTrigger>
              <TabsTrigger value="web-development-manager">Web Development Manager</TabsTrigger>
            </TabsList>
            
            {Object.entries(salaryData).map(([role, data]) => (
              <TabsContent key={role} value={role}>
                <div className="space-y-4">
                  <div className="w-full overflow-x-auto">
                    <BarChart
                      width={700}
                      height={400}
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="min" name="Minimum" fill="#94a3b8" />
                      <Bar dataKey="median" name="Median" fill="#3b82f6" />
                      <Bar dataKey="max" name="Maximum" fill="#1d4ed8" />
                    </BarChart>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-2">City</th>
                          <th className="text-right p-2">Minimum</th>
                          <th className="text-right p-2">Median</th>
                          <th className="text-right p-2">Maximum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((city) => (
                          <tr key={city.city} className="border-t">
                            <td className="p-2">{city.city}</td>
                            <td className="text-right p-2">{formatCurrency(city.min)}</td>
                            <td className="text-right p-2">{formatCurrency(city.median)}</td>
                            <td className="text-right p-2">{formatCurrency(city.max)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}