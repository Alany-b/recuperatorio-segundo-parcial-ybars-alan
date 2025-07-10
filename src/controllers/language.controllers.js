import ProgrammingLanguage from "../models/programmingLanguage.model.js";




export const getAllLanguages = async (req, res) => {
	
    try {
		const languages = await ProgrammingLanguage.findAll  ();
		res.status(200).json(languages);
	} catch (error) {
		res.status(500).json({ message: "Error al obtener los lenguajes" });
	    }
};

export const getLanguageById = async (req, res) => {


    try {
		const lang = await ProgrammingLanguage.findByPk(req.params.id);
		if (!lang) return res.status(404).json({ message: "No se encuentra el lenguaje" });
		res.status(200).json(lang);
	} catch (error) {
		res.status(500).json({ message: "Error al buscar el lenguaje" });
	}
};

export const createLanguage = async (req, res) => {
	try {
		const { name, paradigm, release_year } = req.body;
		if (!name || !paradigm) {
			return res.status(400).json({ message: "Campos obligatorios que faltan" });
		}
		const exists = await ProgrammingLanguage.findOne({ where: { name } });
		if (exists) return res.status(400).json({ message: "El nombre ya existe" });

		const newLang = await ProgrammingLanguage.create({ name, paradigm, release_year });
		res.status(201).json(newLang);
	} catch (error) {
		res.status(500).json({ message: "Error al crear el lenguaje" });
	}
};

export const updateLanguage = async (req, res) => {



    try {
		const { name, paradigm, release_year } = req.body;
		const lang = await ProgrammingLanguage.findByPk(req.params.id);
		if (!lang) return res.status(404).json({ message: "Lenguaje no encontrado" });

		if (!name || !paradigm) {
			return res.status(400).json({ message: "Campos obligatorios que faltan" });
		}
		const existing = await ProgrammingLanguage.findOne({ where: { name } });
		if (existing && existing.id !== lang.id) {
			return res.status(400).json({ message: "Nombre repetido o duplicado" });
		}

		await lang.update({ name, paradigm, release_year });
		res.status(200).json(lang);
	} catch (error) {
		res.status(500).json({ message: "Error al actualizar el lenguaje" });
	}
};

export const deleteLanguage = async (req, res) => {



    try {
		const lang = await ProgrammingLanguage.findByPk(req.params.id);
		if (!lang) return res.status(404).json({ message: "Lenguaje no encontrado" });

		await lang.destroy();
		res.status(200).json({ message: "Lenguaje eliminado correctamente" });
	} catch (error) {
		res.status(500).json({ message: "Error al intentar eliminar el lenguaje" });
	}
};
