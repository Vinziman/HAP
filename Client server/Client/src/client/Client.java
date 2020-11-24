package client;

import java.io.*;
import java.nio.*;
import java.net.*;
import java.util.*;

public class Client {
    
    private String server_name;
    private int server_port;
    
    public Client(String server, int port) throws IOException{
        server_name=server;
        server_port=port;
    }
    
    public Client(String server) throws IOException{
        server_name=server;
        server_port=12345;
    }
    
    public String getAnswer(String code) throws SocketTimeoutException, IOException{
        InputStream input;
        OutputStreamWriter output;
        StringBuffer answer=new StringBuffer();
        String character;
        int n;
        byte[] buffer=new byte[1024];
        Socket client_socket=new Socket();
        InetSocketAddress server_address=new InetSocketAddress(server_name, server_port);
        client_socket.setSoTimeout(1000);
        
        client_socket.connect(server_address, 1000);
        
        output=new OutputStreamWriter(client_socket.getOutputStream());
        output.write(code+"\r\n");
        output.flush();
        
        input=client_socket.getInputStream();
        while((n=input.read(buffer)) != -1){
            if(n>0){
                for(int i=0;i<n;i++){
                    if(buffer[i]=='\r' || buffer[i]=='\n'){
                        input.close();
                        output.close();
                        client_socket.close();
                        return answer.toString();
                    }
                    else{
                        character=new String(buffer, i, 1, "ISO-8859-1");
                        answer.append(character);
                    }
                }
            }
        }
        
        input.close();
        output.close();
        client_socket.close();
        return null;
    }
    
    public static void main(String[] args) {
        String server;
        int port;
        String answer = null;
        String code;
        Client client;
        
        server="10.0.35.18";
        port=12345;
        try{
            System.out.println("Inserisci la frase da trasmetere");
            InputStreamReader reader=new InputStreamReader(System.in);
            BufferedReader myInput=new BufferedReader(reader);
            code=new String(myInput.readLine());
            
            client=new Client(server, port);
            
            answer=client.getAnswer(code);
            System.out.println(answer);
        }
        catch(SocketTimeoutException e){
            System.out.println("Timeout");
            
        }
        catch(IOException e){
            System.out.println("Errore generico di comunicazione");
        }
    }
}