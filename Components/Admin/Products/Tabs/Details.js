"use client";
import { Layers } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import EditorOne from "../New/EditorOne";
import EditorTwo from "../New/EditorTwo";
const Details = () => {
    return (
        <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-white px-6 py-5 border-b">
                <CardTitle className="text-lg font-semibold flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-[#0055a4]" />
                    Product Details
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
                        <TabsTrigger
                            value="description"
                            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0055a4]"
                        >
                            Description
                        </TabsTrigger>
                        <TabsTrigger
                            value="ingredients"
                            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0055a4]"
                        >
                            Ingredients
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-0">
                        <div className="space-y-3 mb-4">
                            <Label className="text-gray-700 font-medium">
                                Detailed Description
                            </Label>
                            <p className="text-sm text-gray-600">
                                Provide a comprehensive description of your product,
                                including its benefits and uses.
                            </p>
                        </div>
                        <div className="min-h-[300px] border rounded-md"> <EditorOne /> </div>
                    </TabsContent>

                    <TabsContent value="ingredients" className="mt-0">
                        <div className="space-y-3 mb-4">
                            <Label className="text-gray-700 font-medium">
                                Ingredients List
                            </Label>
                            <p className="text-sm text-gray-600">
                                List all ingredients in your product. Be transparent
                                about allergens and nutritional information.
                            </p>
                        </div>
                        <div className="min-h-[300px] border rounded-md"> <EditorTwo /> </div>
                    </TabsContent>

                </Tabs>
            </CardContent>
        </Card>
    )
}

export default Details
