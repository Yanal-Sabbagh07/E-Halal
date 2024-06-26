"use client";
import React, {useState, useTransition} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createStoreSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {addStore} from "@/actions/store";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Button} from "@/components/ui/button";
import {Department} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


interface addStoreProps {
    countries: { id: string, name: string }[],
}
export const AddStoreForm = ({countries} : addStoreProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [storeId] = useState(Date.now());
    const departments = [Department.Supermarket, Department.Meat, Department.Perfume];


    const germanCities = [
        {
            "name": "Aachen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Augsburg",
            "state": "Bayern"
        },
        {
            "name": "Bergisch Gladbach",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Berlin",
            "state": "Berlin"
        },
        {
            "name": "Bielefeld",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Bochum",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Bonn",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Bottrop",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Braunschweig",
            "state": "Niedersachsen"
        },
        {
            "name": "Bremen",
            "state": "Bremen"
        },
        {
            "name": "Bremerhaven",
            "state": "Bremen"
        },
        {
            "name": "Chemnitz",
            "state": "Sachsen"
        },
        {
            "name": "Cottbus",
            "state": "Brandenburg"
        },
        {
            "name": "Darmstadt",
            "state": "Hessen"
        },
        {
            "name": "Dortmund",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Dresden",
            "state": "Sachsen"
        },
        {
            "name": "Duisburg",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Düsseldorf",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Erfurt",
            "state": "Thüringen"
        },
        {
            "name": "Erlangen",
            "state": "Bayern"
        },
        {
            "name": "Essen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Frankfurt am Main",
            "state": "Hessen"
        },
        {
            "name": "Freiburg im Breisgau",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Fürth",
            "state": "Bayern"
        },
        {
            "name": "Gelsenkirchen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Göttingen",
            "state": "Niedersachsen"
        },
        {
            "name": "Hagen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Halle (Saale)",
            "state": "Sachsen-Anhalt"
        },
        {
            "name": "Hamburg",
            "state": "Hamburg"
        },
        {
            "name": "Hamm",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Hannover",
            "state": "Niedersachsen"
        },
        {
            "name": "Heidelberg",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Heilbronn",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Herne",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Hildesheim",
            "state": "Niedersachsen"
        },
        {
            "name": "Ingolstadt",
            "state": "Bayern"
        },
        {
            "name": "Jena",
            "state": "Thüringen"
        },
        {
            "name": "Karlsruhe",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Kassel",
            "state": "Hessen"
        },
        {
            "name": "Kiel",
            "state": "Schleswig-Holstein"
        },
        {
            "name": "Koblenz",
            "state": "Rheinland-Pfalz"
        },
        {
            "name": "Krefeld",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Köln",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Leipzig",
            "state": "Sachsen"
        },
        {
            "name": "Leverkusen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Ludwigshafen am Rhein",
            "state": "Rheinland-Pfalz"
        },
        {
            "name": "Lübeck",
            "state": "Schleswig-Holstein"
        },
        {
            "name": "Magdeburg",
            "state": "Sachsen-Anhalt"
        },
        {
            "name": "Mainz",
            "state": "Rheinland-Pfalz"
        },
        {
            "name": "Mannheim",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Moers",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Mönchengladbach",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Mülheim an der Ruhr",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "München",
            "state": "Bayern"
        },
        {
            "name": "Münster",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Neuss",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Nürnberg",
            "state": "Bayern"
        },
        {
            "name": "Oberhausen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Offenbach am Main",
            "state": "Hessen"
        },
        {
            "name": "Oldenburg",
            "state": "Niedersachsen"
        },
        {
            "name": "Osnabrück",
            "state": "Niedersachsen"
        },
        {
            "name": "Paderborn",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Pforzheim",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Potsdam",
            "state": "Brandenburg"
        },
        {
            "name": "Recklinghausen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Regensburg",
            "state": "Bayern"
        },
        {
            "name": "Remscheid",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Reutlingen",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Rostock",
            "state": "Mecklenburg-Vorpommern"
        },
        {
            "name": "Saarbrücken",
            "state": "Saarland"
        },
        {
            "name": "Salzgitter",
            "state": "Niedersachsen"
        },
        {
            "name": "Siegen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Solingen",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Stuttgart",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Trier",
            "state": "Rheinland-Pfalz"
        },
        {
            "name": "Ulm",
            "state": "Baden-Württemberg"
        },
        {
            "name": "Wiesbaden",
            "state": "Hessen"
        },
        {
            "name": "Wolfsburg",
            "state": "Niedersachsen"
        },
        {
            "name": "Wuppertal",
            "state": "Nordrhein-Westfalen"
        },
        {
            "name": "Würzburg",
            "state": "Bayern"
        }
    ];
    const form = useForm<z.infer<typeof createStoreSchema>>({
        resolver: zodResolver(createStoreSchema),
        defaultValues: {
            id: storeId.toString(),
            name: "",
            department: Department.Supermarket,
            countryId: "",
            postal_code: "",
            city: "",
            house_number: "",
            street_name: ""}
    });
    const onSubmit = (values: z.infer<typeof createStoreSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            addStore(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
                if(data.success) {
                    window.location.assign(`/admin/store/${storeId}/dashboard`);
                }
            });
        });
    };
    return (
        <CardWrapper className={"w-[600px]"} headerTitle={"Create New Store"} headerLabel={""} backButtonLabel={"Back to stores"} backButtonHref={"/admin/store/1/dashboard"}>
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"name"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"Store Name"}
                                            type="name"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="department"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Department"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments.map(department => (
                                                <SelectItem key={department} value={department}>
                                                    {department}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="countryId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Country"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {countries.map(country => (
                                                <SelectItem key={country.id} value={country.id}>
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a City"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {germanCities.map((city, index) => (
                                                <SelectItem key={index} value={city.name}>
                                                    {city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"street_name"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Prager Straße"
                                            type="name"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"house_number"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>House Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="30"
                                            type="name"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"postal_code"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Postal code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="01067"
                                            type="name"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button className={"w-full"} type={"submit"} disabled={isPending}>Create</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};


