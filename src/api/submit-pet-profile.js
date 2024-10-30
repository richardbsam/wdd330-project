// api/submit-pet-profile.js
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Disabling body parsing so we can use formidable
    },
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error parsing the files:', err);
                return res.status(500).json({ message: 'Error parsing the files' });
            }

            // Here, `fields` contains the form fields
            // and `files` contains the uploaded files
            console.log('Fields:', fields);
            console.log('Files:', files);

            // TODO: Process the data (e.g., save to a database)

            res.status(200).json({ message: 'Pet profile saved successfully!' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
