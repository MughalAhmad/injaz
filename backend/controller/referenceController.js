  const ReferenceModel = require("../models/referenceModel")
  module.exports = {
    edit: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const checkRef = await ReferenceModel.findOne({_id:rid});
        if (!checkRef) throw new Error("Reference not found");
         
        const upadatedRef = await ReferenceModel.findByIdAndUpdate({ _id: rid }, req.body, { new: true });
        if (!upadatedRef) throw new Error('Reference update process failed');
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Updated! ",
          data: { ref: upadatedRef },
        });
      } catch (error) {
        next(error);
      }
    },
    getReferenceList: async (req, res, next) => {
      try {
        const {currentPage, filter, sortValue} = req.query; 
        const searchQuery = filter;
        const sortOrder = Number(sortValue) ;
        const page = currentPage || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
  
        const options = [
          { $skip: skip }, // Pagination skip
          { $limit: limit },
        ];
  
        if(sortOrder){
          options.unshift({ $sort: { fullName: sortOrder } })
        }

        const refs = await ReferenceModel.aggregate([
          {
            $match: {
              fullName: {
                $regex: searchQuery,
                $options: "i",
              },
            },
          },
          {
            $facet: {
              refs: options,
              totalCount: [
                { $count: "count" }, // Count the total number of documents matching the filter
              ],
            },
          },
        ]);

        const refList = refs[0]?.refs || [];
        const totalDocuments = refs[0]?.totalCount[0]?.count || 0;
        const refCount = Math.ceil(totalDocuments / limit);


         
        if (!refs) throw new Error("References not found");
  
        return res.status(200).json({
          hasError: false,
          msg: "All References Successfully Finded",
          data: { refs: refList, pages:refCount, total:totalDocuments  },
        });
      } catch (error) {
        next(error);
      }
    },
    delete: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const findRef = await ReferenceModel.findOne({_id:rid})
        if (!findRef) throw new Error("Reference Not Found");
         
        const upadatedRef = await ReferenceModel.findByIdAndDelete({ _id: rid }, req.body, { new: true });
        if (!upadatedRef) throw new Error('Reference update process failed');

        const refs = await ReferenceModel.find();
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Deleted!",
          data: refs,
        });
      } catch (error) {
        next(error);
      }
    },
    getReferences: async (req, res, next) => {
      try {
        const { rid } = req.params;
        const findRef = await ReferenceModel.findOne({_id:rid})
        if (!findRef) throw new Error("Reference Not Found");
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Successfully Finded",
          data: { ref: findRef },
        });
      } catch (error) {
        next(error);
      }
    },
    new: async (req, res, next) => {
      try {
         const findRef = await ReferenceModel.findOne({refCode:req.body.refCode});
         if (findRef) throw new Error("Reference code already exists");
        const ref = await ReferenceModel.create(req.body)
        if (!ref) throw new Error("Error in Creating reference");
  
        return res.status(200).json({
          hasError: false,
          msg: "Reference Created!",
          data: { ref: ref },
        });
      } catch (error) {
        next(error);
      }
    },
    
  };
  