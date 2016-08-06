import org.scalatestplus.play.{OneServerPerSuite, PlaySpec}
import play.api.libs.ws.WSClient

import scala.concurrent.Await
import scala.sys.process.{Process, ProcessIO}
import scala.io.Source._
import scala.concurrent.duration._

class ProtractorSpec extends PlaySpec with OneServerPerSuite {

  "my application" should {

    "pass the protractor tests" in {
      val baseUrl = s"http://localhost:$port"
      val wsClient = app.injector.instanceOf[WSClient]

      val resp = Await.result(wsClient.url(baseUrl).get(), 2.seconds)
      resp.status === 200

      println(s"Executing protractor using command: 'node_modules/protractor/bin/protractor --baseUrl=$baseUrl")

      runProtractorTests(baseUrl) === 0
    }

  }

  private def compileE2Etests: Int = {
    Process("tsc" :: "-p" :: "e2e" :: Nil, app.getFile("ui"))
      .run(usingProcessIO)
      .exitValue()
  }

  private def runProtractorTests(baseUrl: String): Int = {
    val e2eTestsCompilationResult = compileE2Etests

    if (e2eTestsCompilationResult === 0) {
      Process("node_modules/protractor/bin/protractor" :: s"--baseUrl=$baseUrl" :: Nil, app.getFile("ui"))
        .run(usingProcessIO)
        .exitValue()
    } else e2eTestsCompilationResult
  }

  private def usingProcessIO = new ProcessIO(_ => (),
    stdout => fromInputStream(stdout).getLines().foreach(println),
    stderr => fromInputStream(stderr).getLines().foreach(println)
  )

}