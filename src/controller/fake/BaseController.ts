// import { v4 as uuidv4 } from "uuid";
// import { AxiosInstance } from "axios";
// import { BaseModel } from "../../model/model/BaseModel";
// import { FindFilter, ListFilter } from "../../model/model/filter/Filter";
// import { Paging } from "../../model/model/filter/Paging";

// export class BaseController<T extends BaseModel> {
// 	public basePath: string;
// 	public client: AxiosInstance;
// 	public serviceURL: string;
// 	constructor(URL: string, basePath: string, appClient: any) {
// 		this.basePath = basePath;
// 		this.serviceURL = URL;
// 		this.client = appClient;
// 	}
// 	async get(id: string): Promise<T | undefined> {
// 		const data = await BaseController.getItem<T>(this.basePath);
// 		return data.find((item) => item.id == id);
// 	}
// 	private static getItem<T>(basePath: string): Promise<T[]> {
// 		var dataLocal = localStorage.getItem(basePath);
// 		if (!dataLocal) {
// 			return Promise.resolve([]);
// 		}
// 		var dataLocalParse = JSON.parse(dataLocal);
// 		console.log(dataLocalParse);
// 		if (!dataLocalParse) dataLocalParse = [];
// 		dataLocalParse = dataLocalParse.filter((item: any) => {
// 			if (!item.isDeleted) {
// 				return item;
// 			}
// 		});
// 		return Promise.resolve(dataLocalParse);
// 	}
// 	private static setItem<T>(t: T[], basePath: string): Promise<T[]> {
// 		localStorage.setItem(basePath, JSON.stringify(t));
// 		return Promise.resolve(t);
// 	}

// 	private static sanitizeParamsList<T>(params: ListFilter<T>): ListFilter<T> {
// 		params = { ...params };
// 		if (typeof params.page === "string") params.page = Number(params.page);

// 		if (!params.page) params.page = 1;

// 		if (typeof params.pageSize === "string")
// 			params.pageSize = Number(params.pageSize) || 10;

// 		if (!params.pageSize) params.pageSize = 10;

// 		if (typeof params.query === "string")
// 			params.query = JSON.parse(params.query);
// 		if (!params.query) params.query = {};

// 		params = this.sanitizeParamsBaseListProps(params);
// 		return params || new ListFilter();
// 	}
// 	private static sanitizeParamsFind<T>(params: FindFilter<T>): FindFilter<T> {
// 		if (typeof params.limit === "string")
// 			params.limit = Number(params.limit) || 1000;
// 		if (!params.offset) params.offset = 0;

// 		if (typeof params.query === "string")
// 			params.query = JSON.parse(params.query);
// 		if (!params.query) params.query = {};
// 		params = this.sanitizeParamsBaseListProps(params);
// 		return params;
// 	}

// 	private static sanitizeParamsBaseListProps<T>(params: any): any {
// 		if (!params.sort) {
// 			params.sort = "-createdAt";
// 		}
// 		if (params.sort) {
// 			if (typeof params.sort === "string") {
// 				params.sort = params.sort.replace(/,/g, " ").split(" ");
// 			}
// 		}

// 		if (params.searchFields) {
// 			if (typeof params.searchFields === "string") {
// 				params.searchFields = params.searchFields.trim();
// 				params.searchFields = params.searchFields
// 					.replace(/,/g, " ")
// 					.split(" ");
// 			}
// 		} else params.searchFields = [];
// 		return params;
// 	}

// 	private static sort<T extends BaseModel>(data: T[], sort: string[]): T[] {
// 		data = data.sort((a: any, b: any) => {
// 			for (let i = 0; i < sort.length; i++) {
// 				const itemSort = sort[i];
// 				var typeSort = itemSort.substring(0, 1) === "-" ? -1 : 1;
// 				var fieldSort =
// 					itemSort.substring(0, 1) === "-"
// 						? itemSort.substring(1, itemSort.length)
// 						: itemSort;
// 				if (typeof a[fieldSort] == "number") {
// 					if (a[fieldSort] === b[fieldSort]) {
// 						return 0;
// 					}
// 					if (a[fieldSort] > b[fieldSort]) {
// 						return typeSort;
// 					} else {
// 						return -typeSort;
// 					}
// 				}
// 				if (typeof a[fieldSort] == "string") {
// 					a[fieldSort] = a[fieldSort]?.toLowerCase() || " ";
// 					b[fieldSort] = b[fieldSort]?.toLowerCase() || " ";
// 					if (a[fieldSort] === b[fieldSort]) {
// 						return 0;
// 					}
// 					if (a[fieldSort] > b[fieldSort]) {
// 						return typeSort;
// 					} else {
// 						return -typeSort;
// 					}
// 				}
// 				var dateA: any = new Date(a[fieldSort]);
// 				var dateB: any = new Date(b[fieldSort]);
// 				if (dateA !== "Invalid Date" && dateB !== "Invalid Date") {
// 					if (dateA.getTime() === dateB.getTime()) {
// 						return 0;
// 					}
// 					if (dateA.getTime() > dateB.getTime()) {
// 						return typeSort;
// 					} else {
// 						return -typeSort;
// 					}
// 				}
// 				if (typeof a[fieldSort] === "boolean") {
// 					if (a[fieldSort] && b[fieldSort]) {
// 						return 0;
// 					}
// 					if (a[fieldSort] === true && b[fieldSort] === false) {
// 						return typeSort;
// 					} else {
// 						return -typeSort;
// 					}
// 				}
// 			}

// 			return 0;
// 		});

// 		return data;
// 	}

// 	private static search<T>(
// 		data: T[],
// 		search: string,
// 		searchField: string[]
// 	): T[] {
// 		if (searchField.length == 0) {
// 			return data;
// 		}
// 		const newData = data
// 			.map((item: any) => {
// 				for (let i = 0; i < searchField.length; i++) {
// 					const filed = searchField[i];
// 					try {
// 						var valueSearch: string = item[filed].toString();
// 						valueSearch = valueSearch.toLowerCase();
// 						if (
// 							valueSearch.search(search.toLocaleLowerCase()) >= 0
// 						) {
// 							return item;
// 						}
// 					} catch (error) {
// 						console.log("Field wrong");
// 					}
// 				}
// 			})
// 			.filter((item) => {
// 				if (item) return item;
// 			});
// 		return newData;
// 	}

// 	async find(params?: FindFilter<T>): Promise<T[]> {
// 		params = BaseController.sanitizeParamsFind(params || {});
// 		var dataAll = await BaseController.getItem<T>(this.basePath);
// 		dataAll = BaseController.search(
// 			dataAll,
// 			params.search || "",
// 			params.searchFields || []
// 		);
// 		dataAll = BaseController.sort(dataAll, params.sort as []);
// 		return Promise.resolve(dataAll);
// 	}

// 	async list(params?: ListFilter<T>): Promise<Paging<T>> {
// 		if (!params) {
// 			params = new ListFilter();
// 		}
// 		params = BaseController.sanitizeParamsList<T>(params);
// 		var dataAll = await await BaseController.getItem<T>(this.basePath);
// 		console.log(dataAll);
// 		dataAll = BaseController.search(
// 			dataAll,
// 			params.search || "",
// 			params.searchFields || []
// 		);
// 		dataAll = BaseController.sort(dataAll, params.sort as []);
// 		var dataPaging = dataAll.slice(
// 			((params.page || 1) - 1) * (params.pageSize || 5),
// 			((params.page || 1) - 1) * (params.pageSize || 5) +
// 				(params.pageSize || 5)
// 		);

// 		return Promise.resolve({
// 			total: dataAll.length,
// 			totalPages: Math.ceil(dataAll.length / (params.pageSize || 0)),
// 			page: params.page,
// 			pageSize: params.pageSize,
// 			rows: dataPaging,
// 		});
// 	}

// 	async save(t: T): Promise<T> {
// 		t.updatedAt = new Date();
// 		t.isDeleted = false;
// 		var data = await BaseController.getItem<T>(this.basePath);
// 		if (t.id) {
// 			const index = data.findIndex((item) => item.id === t.id);
// 			if (index >= 0) {
// 				data[index] = t;
// 				BaseController.setItem<T>(data, this.basePath);
// 				return Promise.resolve(t);
// 			}
// 		} else {
// 			t.id = uuidv4();
// 		}
// 		t.createdAt = new Date();
// 		data.push(t);
// 		await BaseController.setItem<T>(data, this.basePath);
// 		return Promise.resolve(t);
// 	}

// 	async delete(id: string): Promise<T> {
// 		var data = await BaseController.getItem<T>(this.basePath);
// 		const index = data.findIndex((item) => item.id === id);
// 		if (index >= 0) {
// 			data[index].isDeleted = true;
// 			BaseController.setItem<T>(data, this.basePath);
// 			return Promise.resolve(data[index]);
// 		}
// 		throw new Error("Produce not found");
// 	}
// }

export class BaseController {}
