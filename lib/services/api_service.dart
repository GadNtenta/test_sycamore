import 'dart:async';
import 'dart:convert';
import 'dart:developer' as developer;
import 'dart:io';

import 'package:http/http.dart' as http;

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  String get baseUrl =>
      Platform.isAndroid ? 'http://10.0.2.2:3333' : 'http://localhost:3333';

  Future<List<dynamic>> fetchData(String endpoint) async {
    developer.log('Tentative de chargement des données depuis $endpoint');
    try {
      final uri = Uri.parse('$baseUrl/$endpoint');
      developer.log('URL de la requête: $uri');

      final response = await http.get(
        uri,
        headers: {'Accept': 'application/json'},
      ).timeout(
        const Duration(seconds: 10),
        onTimeout: () {
          developer.log('Timeout lors de la requête vers $endpoint');
          throw TimeoutException('La requête a expiré');
        },
      );

      developer.log('Statut de la réponse: ${response.statusCode}');
      developer.log('Corps de la réponse: ${response.body}');

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        developer.log('Données décodées: $data');
        return data;
      } else {
        developer.log('Erreur HTTP: ${response.statusCode}');
        throw Exception('Erreur HTTP: ${response.statusCode}');
      }
    } catch (e) {
      developer.log('Erreur lors du chargement des données: $e');
      if (e is TimeoutException) {
        throw Exception(
            'Le serveur met trop de temps à répondre. Veuillez réessayer.');
      } else if (e is http.ClientException) {
        throw Exception(
            'Impossible de se connecter au serveur. Vérifiez que le serveur est en cours d\'exécution.');
      } else {
        throw Exception('Une erreur est survenue: $e');
      }
    }
  }
}
