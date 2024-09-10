const { getGPTResponse } = require('../services/gptServices'); // Servicio para interactuar con GPT
const File = require('../models/fileModel'); // Modelo para almacenar los archivos generados

// Controlador para procesar los prompts enviados a GPT
const processPrompt = async (req, res) => {
  const { prompt, type, fileName } = req.body; // Extraer los datos del cuerpo de la solicitud
  let apiPrompt = prompt;

  // Verificar el tipo de prompt, por ejemplo, si es para corregir código o generar uno nuevo
  if (type === 'fix') {
    apiPrompt = `Fix the following code:\n${prompt}`;
  } else if (type === 'generate') {
    apiPrompt = `Generate code for the following task:\n${prompt}`;
  }

  try {
    // Obtener la respuesta desde el servicio GPT
    const generatedCode = await getGPTResponse(apiPrompt);

    // Buscar si ya existe un archivo con ese nombre en la base de datos
    let file = await File.findOne({ fileName });
    if (file) {
      // Si ya existe, actualiza la versión y el contenido
      file.version += 1;
      file.content = generatedCode;
    } else {
      // Si no existe, crea un nuevo archivo
      file = new File({ fileName, content: generatedCode });
    }

    // Guardar o actualizar el archivo en la base de datos
    await file.save();

    // Enviar la respuesta con el código generado y la versión del archivo
    res.json({ code: generatedCode, version: file.version });
  } catch (error) {
    console.error('Error processing prompt:', error);
    res
      .status(500)
      .json({ message: 'Error generating response.', error: error.message });
  }
};

module.exports = {
  processPrompt,
};
