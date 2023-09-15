const Company = require('../models/company');
const Interview = require('../models/interview');

// Controller to view all companies

module.exports.viewCompanies = async(req,res) =>{
    try {
        const companies = await Company.find({});

        return res.render('companies', {
            companies: companies,
        })
    } catch (error) {
        console.log('Error in viewCompanies', error);
    }
}

// Controller to add a new company

module.exports.addCompany = async (req,res) => {
    try {
        const{
            name,
            description,
            website
        } = req.body;

        const existingCompany = await Company.findOne({ name });

        if(existingCompany) {
            return res.status(409).send('Company with the same name already exists');
        }

        const company = new Company({
            name,
            description,
            website
        });

        await company.save();

        req.flash('success', 'New company added!');
        res.redirect('/companies/home');
    } catch (error) {
        console.log('Error in addCompany', error);
    }
}

// Controller to delete a company by its ID

module.exports.deleteCompany = async function(req, res){
    try {
        const company = await Company.findById(req.params.id);

        if(!company){
            return res.redirect('back');
        }

        await company.deleteOne({_id: req.params.id});

        req.flash('error', 'Company Deleted!')
        return res.redirect('back');
    } catch (error) {
        console.log('Error in deleteCompany: ', error)
    }
}
