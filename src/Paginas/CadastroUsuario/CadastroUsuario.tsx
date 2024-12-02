/* eslint-disable @typescript-eslint/no-explicit-any */
import './CadastroUsuario.css';
import { useForm, useFieldArray } from 'react-hook-form';
import { CriarUsuario } from '../../Servicos/MercadoFacilAPI';

const UserForm = () => {
    const { register, handleSubmit, control } = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses"
    });
    const onSubmit = (data: any) => {
        console.log(data);
        try {
            CriarUsuario(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Dados de acesso do usuário</h2>
                    <div className='submenu'>
                        <div className='titulos'>
                            <label>Nome: </label>
                            <input className='campos' type="text" {...register("name")} required />
                        </div>
                        <div className='titulos'>
                            <label>Email: </label>
                            <input className='campos' type="email" {...register("email")} required />
                        </div>
                        <div className='titulos'>
                            <label>Senha: </label>
                            <input className='campos' type="password" {...register("password")} required />
                        </div>
                        <div className='titulos'>
                            <label>Role: </label>
                            <input className='campos' type="text" {...register("role")} required />
                        </div>
                    </div>
                    <br />
                    <h2>Endereços</h2>
                    {fields.map((field, index) => (
                        <div className='menu'>
                            <div key={field.id}>
                                <div className='submenu'>
                                <div className='titulos'>
                                    <label>Rua: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].street`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>Número: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].number`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>Complemento: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].complement`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>Vizinhança: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].neighborhood`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>Cidade: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].city`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>Estado: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].state`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>País: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].country`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>CEP: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].zipCode`)} required />
                                </div>
                                <div className='titulos'>
                                    <label>Bairro: </label>
                                    <input className='campos2' type="text" {...register(`addresses[${index}].district`)} required />
                                </div>
                            </div>
                            </div>
                            <button className='rm' type="button" onClick={() => remove(index)}>Remover Endereço</button>
                        </div>
                    ))}
                    <button className='add' type="button" onClick={() => append({})}>Adicionar Endereço</button>
                    <button className='send' type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
};

export default UserForm;