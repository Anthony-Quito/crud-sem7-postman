import {response} from "../../../network";
import {list, find, remove, store, upsert, findBy} from "../../../store/dummy";
import storyModel from "../story/model";

//POST
export const create = async (req, res) => {
    const story = req.body; 

    const data = {
        title: story.title,
        content: story.content,
        user_id: story.user_id,
    };

    const story_create = await store(storyModel, data); 
    return response({res, data: story_create, status: 201}); 
};

//GET 
export const show = async (req, res) => {
    const {id} = req.params; 

    const storyf = await findBy({value: id, model: storyModel}); 

    if (!storyf) {
        response({
            ok: false,
            status: 404,
            res,
            data: "error, story not found"
        });
    }

    return response({res, data: storyf}); 
};

//PUT
export const update = async (req, res) => {
    const {id} = req.params; 

    const story = await upsert({model: storyModel, id: id, data: req.body}); 

    if (!story) {
        return response({
            ok: false,
            status: 404,
            res,
            data: "error, story not found"
        });
    }

    return response({res, data: story}); 
};

//DELETE
export const destroy = async (req, res) => {
    const {id} = req.params;

    const story = await remove(storyModel, id);

    if (!story) {
        return response({
            res,
            status: 404,
            ok: false,
            data: {error: "error, story not found"}
        });
    }

    return response({res, data: {success: "Story delete!"}});
};

//LISTA
export const showAll = async (req, res) => {
    console.log(await list(storyModel));

    return response({res, data: await list(storyModel)});
};
