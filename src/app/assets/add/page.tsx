"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Save } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

// First, let's install required dependencies for form validation
// Note: you need to add these to your package.json
// bun add react-hook-form @hookform/resolvers zod

// Validation schema for the asset form
const assetFormSchema = z.object({
  name: z.string().min(2, {
    message: "Asset name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  status: z.string().default("Active"),
  serialNumber: z.string().optional(),
  location: z.string().min(1, {
    message: "Please select a location.",
  }),
  assignedTo: z.string().optional(),
  description: z.string().optional(),
  purchaseDate: z.string().optional(),
  purchasePrice: z.string().optional(),
  warrantyStart: z.string().optional(),
  warrantyEnd: z.string().optional(),
  customFields: z.record(z.string()).optional(),
  addToMaintenance: z.boolean().default(false),
  uploadAttachments: z.boolean().default(false),
});

type AssetFormValues = z.infer<typeof assetFormSchema>;

export default function AddAssetPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories and locations for select dropdowns
  const categories = [
    { value: "Laptop", label: "Laptop" },
    { value: "Desktop", label: "Desktop" },
    { value: "Server", label: "Server" },
    { value: "Tablet", label: "Tablet" },
    { value: "Printer", label: "Printer" },
    { value: "Phone", label: "Phone" },
    { value: "Network", label: "Network Equipment" },
    { value: "Other", label: "Other" },
  ];

  const locations = [
    { value: "Main Office", label: "Main Office" },
    { value: "Marketing Dept", label: "Marketing Department" },
    { value: "Sales Dept", label: "Sales Department" },
    { value: "IT Dept", label: "IT Department" },
    { value: "Server Room", label: "Server Room" },
    { value: "Remote", label: "Remote Worker" },
  ];

  const statuses = [
    { value: "Active", label: "Active" },
    { value: "Maintenance", label: "In Maintenance" },
    { value: "Checked Out", label: "Checked Out" },
    { value: "Storage", label: "In Storage" },
    { value: "Retired", label: "Retired" },
  ];

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "",
      category: "",
      status: "Active",
      serialNumber: "",
      location: "",
      assignedTo: "",
      description: "",
      purchaseDate: "",
      purchasePrice: "",
      warrantyStart: "",
      warrantyEnd: "",
      addToMaintenance: false,
      uploadAttachments: false,
    },
  });

  async function onSubmit(data: AssetFormValues) {
    setIsSubmitting(true);

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would send this data to your API
      console.log("Asset data submitted:", data);

      // Show success message and redirect
      alert("Asset added successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error adding asset:", error);
      alert("There was an error adding the asset. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // For custom fields
  const [customFields, setCustomFields] = useState<Array<{ key: string; value: string }>>([
    { key: "", value: "" }
  ]);

  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const removeCustomField = (index: number) => {
    const newFields = [...customFields];
    newFields.splice(index, 1);
    setCustomFields(newFields);
  };

  const updateCustomField = (index: number, key: string, value: string) => {
    const newFields = [...customFields];
    newFields[index] = { key, value };
    setCustomFields(newFields);

    // Update the form data
    const customFieldsData: Record<string, string> = {};
    newFields.forEach(field => {
      if (field.key) {
        customFieldsData[field.key] = field.value;
      }
    });
    form.setValue("customFields", customFieldsData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Add New Asset</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Add a new asset to your inventory with detailed information
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Asset Details</TabsTrigger>
                <TabsTrigger value="custom">Custom Fields</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asset Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter asset name" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name or title of the asset (e.g., "Dell XPS 15")
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Type of asset (e.g., Laptop, Printer, etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select asset status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Current status of the asset
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter serial number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Unique identifier for the asset
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Where the asset is located
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assignedTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned To</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter person name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Person currently using this asset
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add details about this asset"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Detailed description of the asset
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Asset Details Tab */}
              <TabsContent value="details" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase Information</CardTitle>
                    <CardDescription>
                      Details about when and how the asset was acquired
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="purchaseDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purchase Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="purchasePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purchase Price</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., $1,299.99" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Warranty Information</CardTitle>
                    <CardDescription>
                      Details about the asset's warranty coverage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="warrantyStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warranty Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="warrantyEnd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warranty End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={form.control}
                        name="addToMaintenance"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Add to Maintenance Schedule</FormLabel>
                              <FormDescription>
                                Automatically create maintenance entries for this asset
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="uploadAttachments"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Upload Attachments</FormLabel>
                              <FormDescription>
                                Upload supporting documents like invoices or manuals
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Custom Fields Tab */}
              <TabsContent value="custom" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Properties</CardTitle>
                    <CardDescription>
                      Add custom fields specific to this asset type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {customFields.map((field, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-1">
                          <FormLabel>Field Name</FormLabel>
                          <Input
                            placeholder="e.g., CPU, RAM, Color"
                            value={field.key}
                            onChange={(e) => updateCustomField(index, e.target.value, field.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <FormLabel>Value</FormLabel>
                          <div className="flex gap-2">
                            <Input
                              placeholder="e.g., Intel i7, 16GB, Black"
                              value={field.value}
                              onChange={(e) => updateCustomField(index, field.key, e.target.value)}
                              className="flex-1"
                            />
                            {customFields.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeCustomField(index)}
                                className="flex-shrink-0"
                              >
                                <span className="sr-only">Remove field</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addCustomField}
                      className="mt-2"
                    >
                      Add Custom Field
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Asset
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
}
