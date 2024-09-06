import { ResponseErrorMessage, ResponseErrorCode } from "../enums";
import { Injectable } from "../decorators"

/**
 * @class ResponseErrorService
 * @description Serviço responsável por gerar mensagens de erro padronizadas para respostas HTTP.
 */
@Injectable()
export class ResponseErrorService {
    /**
     * @method getBookNotFoundMessage
     * @description Retorna uma mensagem de erro padronizada para quando um livro não é encontrado.
     * @returns {object} Objeto contendo o código e a mensagem de erro.
     */
    public getBookNotFoundMessage() {
        return this.defaultMessage(
            ResponseErrorCode.BOOK_RESPONSE_ERROR_CODE,
            ResponseErrorMessage.BOOK_RESPONSE_ERROR_MESSAGE
        );
    }

    /**
     * @method getInternalServerErrorMessage
     * @description Retorna uma mensagem de erro padronizada para erros internos do servidor.
     * @returns {object} Objeto contendo o código e a mensagem de erro.
     */
    public getInternalServerErrorMessage() {
        return this.defaultMessage(
            ResponseErrorCode.INTERNAL_SERVER_ERROR_CODE,
            ResponseErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE
        );
    }

    /**
     * @method defaultMessage
     * @description Gera uma mensagem de erro padronizada.
     * @param {number} code - Código do erro.
     * @param {string} message - Mensagem de erro.
     * @returns {object} Objeto contendo o código e a mensagem de erro.
     * @private
     */
    private defaultMessage(code: number, message: string) {
        return {
            code,
            message
        }
    }
}
