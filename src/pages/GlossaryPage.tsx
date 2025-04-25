
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Input } from '@/components/ui/input';
import { edictsSystem } from '@/data/structuredEdictsPillars';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEdicts = searchTerm 
    ? edictsSystem.pillars.flatMap(pillar => 
        pillar.edicts.filter(edict => 
          edict.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          edict.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(edict => ({ ...edict, pillarName: pillar.name }))
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar />
      
      <main className="flex-grow container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">COS Glossary</h1>
          <p className="text-gray-600 mb-4">
            Reference guide for all 21 Edicts of the Conversion Optimization System
          </p>
          
          <div className="max-w-md">
            <Input
              type="search"
              placeholder="Search edicts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </div>
          
          {searchTerm && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              {filteredEdicts.length === 0 ? (
                <p className="text-gray-500">No edicts match your search term.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredEdicts.map(edict => (
                    <Card key={edict.id} className="border shadow-apple">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {edict.id}. {edict.name}
                          </CardTitle>
                          <Badge variant="outline">
                            {edict.pillarName}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{edict.description}</p>
                        <div className="bg-slate-100 p-3 rounded-lg text-sm">
                          <span className="font-medium">Example:</span>
                          <p className="mt-1">{edict.example}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {!searchTerm && (
            <Tabs defaultValue="1">
              <TabsList className="mb-6 flex flex-wrap">
                {edictsSystem.pillars.map(pillar => (
                  <TabsTrigger key={pillar.id} value={pillar.id.toString()}>
                    {pillar.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {edictsSystem.pillars.map(pillar => (
                <TabsContent key={pillar.id} value={pillar.id.toString()}>
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader>
                      <CardTitle>{pillar.name}</CardTitle>
                      <CardDescription>{pillar.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillar.edicts.map(edict => (
                          <Card key={edict.id} className="border shadow-apple">
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {edict.id}. {edict.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 mb-4">{edict.description}</p>
                              <div className="bg-slate-100 p-3 rounded-lg text-sm">
                                <span className="font-medium">Example:</span>
                                <p className="mt-1">{edict.example}</p>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <span className="text-xs text-gray-500">
                                  Passing threshold: {edict.threshold}%
                                </span>
                                <Badge variant={edict.validator_type === 'client' ? 'outline' : 'secondary'}>
                                  {edict.validator_type === 'client' ? 'Client Validated' : 
                                   edict.validator_type === 'ai' ? 'AI Validated' : 'Hybrid Validation'}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default GlossaryPage;
